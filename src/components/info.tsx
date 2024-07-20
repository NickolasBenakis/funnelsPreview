export type InfoProps = {
  children?: React.ReactNode;
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
};
const Info = ({ heading = "", subheading = "", children }: InfoProps) => {
  return (
    <section className="mx-auto flex max-w-[980px] flex-col items-center justify-center gap-2 py-1 md:py-3 lg:py-4 md:pb-4  lg:pb-4">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        {heading}
      </h1>
      <span className="max-w-[750px] text-center text-lg font-light text-foreground">
        {subheading}
      </span>
      {children}
    </section>
  );
};

export default Info;
