import { faker } from "@faker-js/faker";

import FormData from "form-data";
import { FormValues } from "@/types/global";
import { postAxiosAPI } from "../request/request";

// Mock FormData
function FormDataMock(this: { append: (name: string, value: any) => void }) {
  this.append = jest.fn();
}

global.FormData = FormDataMock as any;

const createRandomActuality = ({
  title = "Test Activity",
}: {
  title: string;
}): FormValues => {
  const startDate = faker.date.soon();
  const additionalHours = faker.number.int({ min: 1, max: 3 });
  const endDate = new Date(
    startDate.getTime() + additionalHours * 60 * 60 * 1000
  );
  return {
    title,
    publishedAt: startDate,
    unPublishedAt: endDate,
    description: faker.lorem.paragraph(),
  };
};

describe("Actuality API", () => {
  let activityId: number;
  it("Create an actuality", async () => {
    const actualityData: FormValues = createRandomActuality({
      title: "Actuality Test Form",
    });

    const result = await postAxiosAPI(`/actualities`, {
      data: actualityData,
    });
    expect(result.status).toBe(200);

    const actuality = result.data;
    activityId = actuality?.data?.id;
    expect(activityId).toBeDefined();

    expect(actuality.data).toMatchObject<any>({
      id: expect.any(Number),
      description: actualityData.description,
    });
  });
  it("Create an actuality with FormData", async () => {
    const actualityData: FormValues = createRandomActuality({
      title: "Actuality Test Form Data",
    });
    const formData = new FormData();
    formData.append("data", JSON.stringify(actualityData));

    const result = await postAxiosAPI(`/actualities`, formData as any);

    expect(result?.status).toBe(200);
    const actuality = result.data;
    expect(actuality.data).toMatchObject<any>({
      id: expect.any(Number),
      description: actualityData.description,
    });
  });
});
