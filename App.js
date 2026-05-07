import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// --- DUMMY DATA ---
const CHATS = [
  { id: '1', name: 'Zeeshan Ahmed', msg: 'The React project is ready!', time: '10:45 AM', count: '2' },
  { id: '2', name: 'Mobile Dev Class', msg: 'Sir: Please submit the APK', time: 'Yesterday', count: '24' },
  { id: '3', name: 'John Doe', msg: 'React Navigation is awesome 🚀', time: 'Monday', count: null },
  { id: '4', name: 'Jane Smith', msg: 'Meeting at 5 PM', time: 'Monday', count: '1' },
  { id: '5', name: 'Project Group', msg: 'Did you check the UI?', time: 'Sunday', count: null },
];

const CALLS = [
  { id: '1', name: 'Zeeshan Ahmed', time: 'Today, 12:30 PM', type: 'incoming', missed: false },
  { id: '2', name: 'Jane Smith', time: 'Yesterday, 8:15 PM', type: 'outgoing', missed: true },
];

// --- REUSABLE COMPONENTS ---

const WhatsAppHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerTop}>
      <Text style={styles.headerTitle}>WhatsApp</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity><MaterialCommunityIcons name="camera-outline" size={22} color="white" style={styles.icon} /></TouchableOpacity>
        <TouchableOpacity><MaterialCommunityIcons name="magnify" size={22} color="white" style={styles.icon} /></TouchableOpacity>
        <TouchableOpacity><MaterialCommunityIcons name="dots-vertical" size={22} color="white" style={styles.icon} /></TouchableOpacity>
      </View>
    </View>
  </View>
);

const ChatItem = ({ name, msg, time, count }) => (
  <TouchableOpacity style={styles.chatItem}>
    <View style={styles.avatarPlaceholder}>
       <MaterialCommunityIcons name="account" size={35} color="#BDBDBD" />
    </View>
    <View style={styles.chatContent}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatName}>{name}</Text>
        <Text style={[styles.chatTime, count && {color: '#25D366'}]}>{time}</Text>
      </View>
      <View style={styles.chatFooter}>
        <Text style={styles.chatMsg} numberOfLines={1}>{msg}</Text>
        {count && <View style={styles.badge}><Text style={styles.badgeText}>{count}</Text></View>}
      </View>
    </View>
  </TouchableOpacity>
);

// --- SCREENS ---
const ChatsScreen = () => (
  <View style={styles.screenContainer}>
    <FlatList data={CHATS} keyExtractor={item => item.id} renderItem={({item}) => <ChatItem {...item} />} />
    <TouchableOpacity style={styles.fab}><MaterialCommunityIcons name="message-text" size={24} color="white" /></TouchableOpacity>
  </View>
);

const StatusScreen = () => (
  <View style={styles.screenContainer}>
    <TouchableOpacity style={styles.chatItem}>
      <View style={[styles.avatarPlaceholder, {borderWidth: 2, borderColor: '#25D366'}]}>
         <MaterialCommunityIcons name="plus" size={20} color="#25D366" />
      </View>
      <View style={styles.chatContent}>
        <Text style={styles.chatName}>My Status</Text>
        <Text style={styles.chatMsg}>Tap to add status update</Text>
      </View>
    </TouchableOpacity>
    <Text style={styles.sectionHeader}>Recent updates</Text>
    <TouchableOpacity style={styles.fab}><MaterialCommunityIcons name="camera" size={24} color="white" /></TouchableOpacity>
  </View>
);

const CallsScreen = () => (
  <View style={styles.screenContainer}>
    <FlatList data={CALLS} keyExtractor={item => item.id} renderItem={({item}) => (
        <TouchableOpacity style={styles.chatItem}>
          <View style={styles.avatarPlaceholder}>
             <MaterialCommunityIcons name="account" size={35} color="#BDBDBD" />
          </View>
          <View style={styles.chatContent}>
            <Text style={styles.chatName}>{item.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons name={item.type === 'incoming' ? "arrow-bottom-left" : "arrow-top-right"} size={16} color={item.missed ? "#FF2D55" : "#25D366"} />
              <Text style={styles.chatMsg}> {item.time}</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="phone" size={22} color="#075E54" />
        </TouchableOpacity>
      )}
    />
    <TouchableOpacity style={styles.fab}><MaterialCommunityIcons name="phone-plus" size={24} color="white" /></TouchableOpacity>
  </View>
);

// --- NAVIGATION & FRAME ---
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <View style={styles.desktopContainer}>
      {/* Device Body */}
      <View style={styles.deviceFrame}>
        {/* Notch / Speaker Area */}
        <View style={styles.notch}>
          <View style={styles.speaker} />
          <View style={styles.cameraCircle} />
        </View>
        
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#075E54' }} edges={['top']}>
            <StatusBar backgroundColor="#054D44" barStyle="light-content" />
            <WhatsAppHeader />
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={{
                  tabBarActiveTintColor: '#fff',
                  tabBarInactiveTintColor: '#B3D9D2',
                  tabBarIndicatorStyle: { backgroundColor: '#fff', height: 3 },
                  tabBarStyle: { backgroundColor: '#075E54', elevation: 0, shadowOpacity: 0 },
                  tabBarLabelStyle: { fontWeight: 'bold', fontSize: 13 },
                }}
              >
                <Tab.Screen name="CHATS" component={ChatsScreen} />
                <Tab.Screen name="STATUS" component={StatusScreen} />
                <Tab.Screen name="CALLS" component={CallsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>

        {/* Bottom Home Bar */}
        <View style={styles.homeBar} />
      </View>
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  // Mobile Frame Styling
  desktopContainer: { 
    flex: 1, 
    backgroundColor: '#0D0D0D', // Dark background for contrast
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  deviceFrame: { 
    width: 360, 
    height: 760, 
    backgroundColor: 'white', 
    borderRadius: 45, 
    borderWidth: 10, 
    borderColor: '#1F1F1F', // Device bezel color
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 25,
  },
  notch: {
    width: '50%',
    height: 30,
    backgroundColor: '#1F1F1F',
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    zIndex: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speaker: { width: 40, height: 4, backgroundColor: '#333', borderRadius: 2 },
  cameraCircle: { width: 8, height: 8, backgroundColor: '#333', borderRadius: 4, marginLeft: 10 },
  homeBar: {
    width: 130,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
  },

  // WhatsApp UI Styling
  screenContainer: { flex: 1, backgroundColor: '#fff' },
  headerContainer: { backgroundColor: '#075E54', paddingTop: 10 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', height: 60 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row' },
  icon: { marginLeft: 18 },
  chatItem: { flexDirection: 'row', padding: 15, alignItems: 'center' },
  avatarPlaceholder: { 
    width: 52, 
    height: 52, 
    borderRadius: 26, 
    backgroundColor: '#F0F0F0', 
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chatContent: { flex: 1, borderBottomWidth: 0.5, borderBottomColor: '#F4F4F4', paddingBottom: 15 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  chatName: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  chatTime: { fontSize: 12, color: '#666' },
  chatFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  chatMsg: { color: '#666', fontSize: 14, flex: 1 },
  badge: { backgroundColor: '#25D366', borderRadius: 12, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 4 },
  badgeText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  sectionHeader: { padding: 12, backgroundColor: '#F8F8F8', color: '#666', fontWeight: 'bold', fontSize: 13 },
  fab: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#25D366', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 5 },
});