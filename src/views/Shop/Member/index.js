import { connect } from "react-redux";
import Member from "./Member";
import { getCertificate } from "../../../modules/Certificate";
import { changePays, getTypePays } from "../../../modules/Shop";

// const mapStateFromProps = state => ({
//   // certificate: getCertificate(state),
//   membersForm: state.form
// });

// const mapDispatchFromProps = { null };

// export default connect(mapStateFromProps, null)(Member);
// export default Member;

const mapStateFromProps = state => ({
  typePays: getTypePays(state)
});

const mapDispatchFromProps = { changePays };

export default connect(mapStateFromProps, mapDispatchFromProps)(Member);
