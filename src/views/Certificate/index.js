import { connect } from "react-redux";
import Certificate from "./Certificate";
// import { sendCertificate } from "../../modules/Certificate/actions";
import { deleteState, sendCertificate } from "../../modules/Certificate";

const mapDispatchFromProps = { sendCertificate, deleteState };

export default connect(null, mapDispatchFromProps)(Certificate);
