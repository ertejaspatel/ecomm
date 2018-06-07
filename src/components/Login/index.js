import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  List,
  ListItem,
  InputGroup,
  Input,
  Text,
  Icon,
  Card,
  CardItem,
  Label,
  Form,
  Item
} from "native-base";

import {API} from "../../lib/api"
import { observer, inject } from "mobx-react/native";
import ThemeHeader from "../CommonComponents/Header/index.js";
import IconFA from "react-native-vector-icons/FontAwesome";
import Style from "./style.js";

@inject("view.app", "domain.user", "app", "routerActions")
@observer
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      form: {
        password: '',
        username: '',
      },
    };
  }

  login = () => {
    let valid = true;
    console.log("login -", this.state);
    if (valid) {
      let data = {
        username: this.state.form.username,
        password: this.state.form.password,
      };

      API.login(this.loginCallback, data);
    }
  }

  loginCallback = {
    success: (response) => {
      let sessionIdSet = this.props["domain.user"];
      sessionIdSet.sessionID = response;
      this.setState({
        form: { ...this.state.form, password: '' }
      });

      let data = {
        Authorization : 'Bearer ' + response
      }
      API.getCustomerDetails(this.getCustomerDetailsResponse, data);
    },
    error: (response) => {
      console.log("error -", response);
    }
  };

  getCustomerDetailsResponse = {
    success: (response) => {
      console.log("success", response);
      let userNameSet = this.props["domain.user"];
      userNameSet.username = response.firstname +" "+response.lastname;
      this.props.navigation.navigate("Profile");
      
    },
    error: (response) => {
      console.log("error -", response);
    }
  }
  render() {
    const userStore = this.props["domain.user"];
    const navigation = this.props.navigation;
    console.log("store -", userStore);
    return (
      <Container>
        <ThemeHeader
          PageTitle="LOGIN"
          IconLeft="arrow-back"
          route="loginHome"
          navigation={navigation}
        />
        <Content
          padder
          style={{ backgroundColor: "#fff", marginBottom: null }}
          bounces={false}
        >
          <Form>
            <Item underline style={{ marginLeft: 0 }}>
              <Input placeholder="Email address" onChangeText={(text) => {
                this.setState({
                  form: { ...this.state.form, username: text }
                });
              }} />
            </Item>
            <Item underline style={{ marginLeft: 0 }}>
              <Input placeholder="Password" secureTextEntry={true} onChangeText={(text) => {
                this.setState({
                  form: { ...this.state.form, password: text }
                });
              }}
                value={this.state.form.password} />
            </Item>
            <Button
              primary
              block
              onPress={this.login}
              style={{ marginTop: 30 }}
            >
              <Text> LOGIN </Text>
            </Button>
            <Button block transparent>
              <Text style={{ fontWeight: "700", fontSize: 12 }}>
                FORGOT PASSWORD?
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default Login;
