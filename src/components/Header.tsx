interface IHeaderParams {
  title: string;
}

export function Header({ title }: IHeaderParams) {
  return (
    <div className="py-4 w-full mx-aut">
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
}
