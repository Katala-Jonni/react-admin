import { connect } from "react-redux";
import Certificate from "./Certificate";
import { getCertificate } from "../../modules/Certificate";

const mapStateFromProps = state => ({
  // certificate: getCertificate(state)
});

// const mapDispatchFromProps = { null };

export default connect(null, null)(Certificate);
