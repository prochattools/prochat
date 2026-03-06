interface types {
  title: string;
  desc: string;
  maxWidth?: number;
}

const Heading = ({ title, desc, maxWidth }: types) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2
        className={`text-[42px] leading-[50px] font-bold text-center mb-4 text-black1 dark:text-white`}
      >
        {title}
      </h2>
      <p
        className={`text-muted-foreground dark:text-tertiary font-inter font-medium text-base text-center`}
        style={{ maxWidth: maxWidth ? `${maxWidth}px` : "none" }}
      >
        {desc}
      </p>
    </div>
  );
};

export default Heading;
