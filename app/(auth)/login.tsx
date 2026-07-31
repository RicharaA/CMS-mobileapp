import { View, Text, Button, Pressable } from "react-native";

export default function LoginScreen() {
    return(
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Pressable onPress={() => console.log("Pressable Pressed")} style={{ marginTop: 20, padding: 10, backgroundColor: "lightblue" }}>
        <Text>Hello</Text>
      </Pressable>
      <Button title="Login" onPress={() => console.log("Login Pressed")} />
      <Button title="Sign Up" onPress={() => console.log("Sign Up Pressed")} />
     <Button title="Forgetpassword " onPress={() => console.log("Sign Up Pressed")} />
    </View>
    );
}