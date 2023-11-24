export const convertDate = (timestamp) => {
  const currentDate = new Date();
  const createdAt = new Date(timestamp);
  const timeDifference = currentDate - createdAt;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (minutes < 60) {
    return `${minutes}min ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else if (days < 7) {
    return `${days}d ago`;
  } else if (weeks < 4) {
    return `${weeks}w ago`;
  } else {
    return `${months}m ago`;
  }
};

export const formatSalary = (salary) => {
  if (typeof salary === "number" && !isNaN(salary)) {
    return salary.toLocaleString();
  }
  return salary;
};
