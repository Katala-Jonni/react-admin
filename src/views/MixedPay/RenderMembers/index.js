import RenderMembers from "./RenderMembers";
import { connect } from "react-redux";
import { getCard, getCash, getCertificate } from "../../../modules/MixedPay";
import { removeType } from "../../../modules/MixedPay";

const mapStateFromProps = state => ({
  cash: getCash(state),
  card: getCard(state),
  certificate: getCertificate(state)
});

const mapDispatchFromProps = { removeType };

export default connect(mapStateFromProps, mapDispatchFromProps)(RenderMembers);
