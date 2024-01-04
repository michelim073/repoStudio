import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MessagesClase, User } from "../../../src/models";
import { useStoreContext } from "../../store/storeContext";
import { DataStore } from "aws-amplify/datastore";
import { getUrl } from "aws-amplify/storage";
import {format, toDate} from 'date-fns'

type Props = {
  item: MessagesClase;
};

const ItemListMessage = (props: Props) => {
  const store = useStoreContext();
  const { item } = props;
  const [imageUrl, setImageUrl] = useState<string>()
  const [userMessage, setUserMessage] = useState<User>();
 
  useEffect(() => {
    const subscription = DataStore.observeQuery(User, u => u.id.eq(item.userID)).subscribe(snapshot => {
      const { items, isSynced } = snapshot;
     setUserMessage(items[0])
    });
    return () => {
      subscription.unsubscribe()
    }
  }, []);

  const getImageUrl = async () =>{
    const res = await getUrl({
      key:`${item.imagen}`,
    })
    setImageUrl(res?.url?.href)
  }
useEffect(() => {
  if (item.imagen) {
   getImageUrl()
  }
}, [item.imagen]);
  
  if (!item) {
    return 
  }
  if (userMessage === undefined || userMessage === null) {
    return 
  }
  return (
    <View style={styles.container}>
      <Pressable >
        <View style={{ flexDirection: "row" }}>
        
         <Image
            source={userMessage?.imageUser === null ? require("../../../assets/images/useri.png") : {uri:userMessage?.imageUser}}
            style={{ width: 45, height: 45, borderRadius: 25 }}
          />
          <View style={styles.rightContainer}>
            <View>
              <Text style={styles.textName}>{userMessage?.name}</Text>
            </View>
            
            {imageUrl && <Image resizeMode="contain"
            source={{uri:imageUrl}}
            style={{ width: '100%', aspectRatio:1/1}}
          />}
          {item.text && <Text>{item?.text}</Text>}
          
             <View style={{alignSelf:'flex-end', marginRight:1}}>
     
           <Text>{item?.createdAt && format(item?.createdAt, 'h:mm a')}</Text>
        </View>
          </View>
          
        </View>
       
       
      </Pressable>
    </View>
  );
};

export default ItemListMessage;

const styles = StyleSheet.create({
  container: {
    
    backgroundColor:'white'
  },
  rightContainer:{
   padding:3,
    marginLeft:8, 
     backgroundColor: "#f2f2f2",
     maxWidth:'80%',
     borderRadius:10
  }, 
  textName:{
    fontSize:16,
    fontWeight:'600',
  },
    textMessage:{},
});
