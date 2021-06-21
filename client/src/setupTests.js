// this file runs before any other tests
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new EnzymeAdapter() });
