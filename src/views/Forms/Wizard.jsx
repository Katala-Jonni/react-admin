import React from "react";

// core components
import Wizard from "../../components/Wizard/Wizard.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import ItemGrid from "../../components/Grid/GridItem.jsx";

import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";

class WizardView extends React.Component {
  render() {
    return (
      <GridContainer justify="center">
        <ItemGrid xs={12} sm={8}>
          <Wizard
            validate
            steps={[
              { stepName: "Контактная информация", stepComponent: Step1, stepId: "about" },
              { stepName: "Выбор мастера", stepComponent: Step2, stepId: "account" },
              { stepName: "Выбор даты/времени", stepComponent: Step3, stepId: "address" }
            ]}
            // title="Записать Клиента"
            // subtitle="Заполните все поля корректно"
          />
        </ItemGrid>
      </GridContainer>
    );
  }
}

export default WizardView;
