import { connect } from "react-redux";
import Member from "./Member";
import { getCertificate } from "../../../modules/Certificate";

// const mapStateFromProps = state => ({
//   // certificate: getCertificate(state),
//   membersForm: state.form
// });

// const mapDispatchFromProps = { null };

// export default connect(mapStateFromProps, null)(Member);
export default Member;
