interface IHeaderParams {
  title: string;
}

export function Header({ title }: IHeaderParams) {
  return <div className="p-6 w-full mx-aut">{title}</div>;
}
