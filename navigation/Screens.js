import React from "react";
import { Easing, Animated, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from "../screens/Components";
import HomeScreen from "../screens/Home";
import OnboardingScreen from "../screens/Onboarding";
import ProfileScreen from "../screens/Profile";
import Currency from "../screens/Currency";
import SelectCurrency from "../screens/SelectCurrency";
import Gold from "../screens/Gold";
import ProScreen from "../screens/Pro";
import SettingsScreen from "../screens/Settings";

import CustomDrawerContent from "./Menu";
import { Icon, Header } from "../components";
import { Images, materialTheme } from "../constants/";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const profile = {
  avatar: Images.Profile,
  name: "Rachel Brown",
  type: "Seller",
  plan: "Pro",
  rating: 4.8,
};

function SettingsStack(props) {
  return (
    <Stack.Navigator initialRouteName='Currency' mode='card'>
      <Stack.Screen
        name='Currency'
        component={Currency}
        options={{
          header: ({ navigation, scene }) => (
            <Header title='Currency' scene={scene} navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name='SelectCurrency'
        component={SelectCurrency}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title='Select Currency' scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function GoldStack(props) {
  return (
    <Stack.Navigator initialRouteName='Gold' mode='card'>
      <Stack.Screen
        name='Gold'
        component={Gold}
        options={{
          header: ({ navigation, scene }) => (
            <Header title='Gold' scene={scene} navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name='SelectCurrency'
        component={SelectCurrency}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title='Select Currency' scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ComponentsStack(props) {
  return (
    <Stack.Navigator mode='card' headerMode='screen'>
      <Stack.Screen
        name='Components'
        component={ComponentsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title='Components' scene={scene} navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Tab.Navigator
      initialRouteName='Currency'
      activeColor='#fbfbfb'
      barStyle={{ backgroundColor: materialTheme.COLORS.BUTTON_COLOR }}>
      <Tab.Screen
        name='Currency'
        component={SettingsStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Icon size={26} name='dollar' family='Foundation' color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Gold'
        component={GoldStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Icon size={26} name='gold' family='MaterialCommunityIcons' color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    // <Stack.Navigator mode='card' headerMode='screen'>
    //   <Stack.Screen
    //     name='Home'
    //     component={HomeScreen}
    //     options={{
    //       header: ({ navigation, scene }) => (
    //         <Header search tabs title='Home' navigation={navigation} scene={scene} />
    //       ),
    //     }}
    //   />
    //   <Stack.Screen
    //     name='Currency'
    //     component={Currency}
    //     options={{
    //       header: ({ navigation, scene }) => (
    //         <Header back tabs title='Convert Currency' navigation={navigation} scene={scene} />
    //       ),
    //     }}
    //   />
    //   <Stack.Screen
    //     name='Gold'
    //     component={Currency}
    //     options={{
    //       header: ({ navigation, scene }) => (
    //         <Header back tabs title='Gold Rates' navigation={navigation} scene={scene} />
    //       ),
    //     }}
    //   />
    // </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} profile={profile} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          // paddingVertical: 4,
          justifyContent: "center",
          alignContent: "center",
          // alignItems: 'center',
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal",
        },
      }}
      initialRouteName='Home'>
      <Drawer.Screen
        name='Home'
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name='shop'
              family='GalioExtra'
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={SettingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name='gears'
              family='font-awesome'
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: -3 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Components'
        component={ComponentsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name='md-switch'
              family='ionicon'
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Sign In'
        component={ProScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name='ios-log-in'
              family='ionicon'
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Sign Up'
        component={ProScreen}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name='md-person-add'
              family='ionicon'
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode='card' headerMode='none'>
      <Stack.Screen
        name='Onboarding'
        component={OnboardingScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name='App' component={AppStack} />
    </Stack.Navigator>
  );
}

/*
const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Profile" navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Settings" navigation={navigation} />,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

const ComponentsStack = createStackNavigator({
  Components: {
    screen: ComponentsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Components" navigation={navigation} />,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});


const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header search tabs title="Home" navigation={navigation} />,
    })
  },
  Pro: {
    screen: ProScreen,
    navigationOptions: ({navigation}) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
},
{
  cardStyle: { 
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        drawerLabel: () => {},
      },
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        )
      }
    },
    Woman: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Woman" />
        ),
      }),
    },
    Man: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Man" />
        ),
      }),
    },
    Kids: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Kids" />
        ),
      }),
    },
    NewCollection: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="New Collection" />
        ),
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Profile" title="Profile" />
        ),
      }),
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Settings" title="Settings" />
        ),
      }),
    },
    Components: {
      screen: ComponentsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Components" title="Components" />
        ),
      }),
    },
    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
      },
    },
    SignIn: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Sign In" />
        ),
      }),
    },
    SignUp: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} screen="Pro" title="Sign Up" />
        ),
      }),
    },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;

*/