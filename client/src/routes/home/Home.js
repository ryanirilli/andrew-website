// @flo

import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import { BASE_SPACING_UNIT, MQ } from "../../styles/style-config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import anime from "animejs";

import { Container } from "../../styles/layouts";
import { H1} from "../../styles/typography";
import { Pad } from "../../styles/spacing";

type Props = {

};

class Home extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Container>
        <Pad>
          <H1>Andrew Franks</H1>
        </Pad>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
