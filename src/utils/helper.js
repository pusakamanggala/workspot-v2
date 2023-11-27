export const convertDate = (created_at) => {
  const now = new Date();
  const createdAtDate = new Date(created_at);
  const timeDifference = now - createdAtDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (days === 0) {
    return "New";
  } else if (days === 1) {
    return "1 days ago";
  } else if (days <= 30) {
    return `${days} days ago`;
  } else if (days <= 365) {
    return `${months} month ago`;
  } else {
    return `${years} years ago`;
  }
};

export const formatSalary = (salary) => {
  if (typeof salary === "number" && !isNaN(salary)) {
    return salary.toLocaleString();
  }
  return salary;
};
