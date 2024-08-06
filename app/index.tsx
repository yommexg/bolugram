import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const HomeScreen = () => {
  return <Redirect href={"/(auth)/login"} />;
};

export default HomeScreen;

const styles = StyleSheet.create({});