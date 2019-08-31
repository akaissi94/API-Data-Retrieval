import * as React from "react";

interface IProps {
  name?: string;
}

const Header: React.FC<IProps> = (props: IProps) => <h1>{props.name}</h1>;

export default Header;
