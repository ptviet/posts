import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Home from "../components/Home";

describe("<Home />", () => {
  it("should render and match snapshot", () => {
    const wrapper = shallow(<Home />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
