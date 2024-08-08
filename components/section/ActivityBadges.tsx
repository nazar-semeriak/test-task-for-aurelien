import React from "react";

interface ActivityBadgesProps {
  activity: {
    attributes: {
      publishedAt: string;
      startDate: string;
    };
  };
}

const ActivityBadges: React.FC<ActivityBadgesProps> = ({ activity }) => {
  let badgeStatus: JSX.Element;

  if (!activity.attributes.publishedAt) {
    badgeStatus = <span className="badge bg-warning ms-2">Brouillon</span>;
  } else if (new Date(activity.attributes.startDate) > new Date()) {
    badgeStatus = <span className="badge bg-primary ms-2">Programmé</span>;
  } else {
    badgeStatus = <span className="badge bg-success ms-2">Publié</span>;
  }

  return badgeStatus;
};

export default ActivityBadges;
