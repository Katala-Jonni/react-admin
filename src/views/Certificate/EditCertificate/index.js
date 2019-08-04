import { connect } from "react-redux";
import EditCertificate from "./EditCertificate";
import { getCertificate } from "../../../modules/Certificate";

const mapStateFromProps = state => ({
  certificate: getCertificate(state)
});

// const mapDispatchFromProps = { null };

export default connect(mapStateFromProps, null)(EditCertificate);
