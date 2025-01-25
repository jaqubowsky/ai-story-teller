import { Alert } from "react-native";

type AlertProps = {
  title: string;
  message: string;
};

const AsyncAlert = async ({ title, message }: AlertProps) =>
  new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          onPress: () => {
            resolve(false);
          },
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            resolve(true);
          },
        },
      ],
      { cancelable: false }
    );
  });

export default AsyncAlert;
