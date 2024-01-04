import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from 'uuid'
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text
} from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { uploadData } from 'aws-amplify/storage';
import { DataStore } from "aws-amplify/datastore";
import { MessagesClase } from "../../../src/models";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

      
      type Props = {
        chatroomInfo: any
      };

const MessageInputChats = (chatroomInfo: Props) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [soundURI, setSoundURI] = useState<string | null>(null);
  const { user } = useAuthenticator()


  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
        await Audio.requestPermissionsAsync();

        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const onPress = () => {
    if (image) {
      sendImage()
    } else if (soundURI) {
      // sendAudio();
    } else if (message) {
       sendMessage();
    } else {
      // onPlusClicked();
    }
  };

  const resetFields = () => {
    setMessage("");
    setImage(null);
    setProgress(0);
    setSoundURI(null);

  };

    // Image picker
    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 0.5,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const takePhoto = async () => {
      console.log('foto')
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        // console.log(image)
      }
    };

    const sendImage = async () => {
      if (!image) {
        return
      }
      try {
       const blob = await getBlob(image)
       const result = await uploadData({
        key: `${uuidv4()}.png`,
        data: blob
      }).result
      console.log('Succeesded ', result)

      await DataStore.save(
        new MessagesClase({
        text: message,
        imagen: result?.key,
        userID: user?.userId,
        chatroomclasesID: chatroomInfo.chatroomInfo,
      })
    )
    resetFields()
      } catch (error) {
        console.log('Error : ', error )
      }
   };

   const getBlob = async (uri: string) => {
    const respone = await fetch(uri);
    const blob = await respone.blob();
    return blob;
  };
  
    const progressCallback = (progress:any) => {
      setProgress(progress.loaded / progress.total);
    };

    const sendMessage = async() =>{
        if (!message) {
          return
        }
        try {   
          const res = await DataStore.save(
          new MessagesClase({
          text: message,
          userID: user?.userId,
          chatroomclasesID: chatroomInfo.chatroomInfo,
        })
      )
      resetFields()
          console.log(res)
        } catch (error) {
          console.log(error)
        }
   
    }

    if (!chatroomInfo.chatroomInfo) {
          return  <Text>No Chats Info</Text>
    }

  return (
    <KeyboardAvoidingView
      style={[styles.root, { height: "auto" }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      {/* {messageReplyTo && (
      <View
        style={{
          backgroundColor: "#f2f2f2",
          padding: 5,
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>Reply to:</Text>
          <MessageComponent message={messageReplyTo} />
        </View>
        <Pressable onPress={() => removeMessageReplyTo()}>
          <AntDesign
            name="close"
            size={24}
            color="black"
            style={{ margin: 5 }}
          />
        </Pressable>
      </View>
    )} */}

      {/*     {image && (
                <View style={styles.sendImageContainer}>
                   <Image
          source={{ uri: Image }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />

        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignSelf: "flex-end",
          }}
        >
          <View
            style={{
              height: 5,
              borderRadius: 5,
              backgroundColor: "#3777f0",
              width: `${progress * 100}%`,
            }}
          />
        </View>

        <Pressable onPress={() => setImage(null)}>
          <AntDesign
            name="close"
            size={24}
            color="black"
            style={{ margin: 5 }}
          />
        </Pressable>
      </View>
    )} */}

      {/* {soundURI && <AudioPlayer soundURI={soundURI} />} */}

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable>
            <SimpleLineIcons
              name="emotsmile"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>

          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Chat message..."
          />

          <Pressable onPress={pickImage}>
            <Feather
              name="image"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>

          <Pressable onPress={takePhoto}>
            <Feather
              name="camera"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>

          <Pressable>
            <MaterialCommunityIcons
              name={recording ? "microphone" : "microphone-outline"}
              size={24}
              color={recording ? "red" : "#595959"}
              style={styles.icon}
            />
          </Pressable>
        </View>

        <Pressable onPress={onPress} style={styles.buttonContainer}>
          {message || image || soundURI ? (
            <Ionicons name="send" size={18} color="white" />
          ) : (
            <AntDesign name="plus" size={24} color="white" />
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageInputChats;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  inputContainer: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dedede",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#3777f0",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 35,
  },
  sendImageContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
  },
});
