import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Page from "../components/Page";

describe("<Page />", () => {
  it("should render and match snapshot", () => {
    const wrapper = shallow(<Page />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
