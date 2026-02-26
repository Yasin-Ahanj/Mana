"use client"
type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-md 
      bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 
      ${className}`}
    />
  );
};

export default Skeleton;
