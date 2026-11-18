import { Tabs } from 'expo-router';
import { Icon } from '../../src/components/Icon';
import { c, fonts } from '../../src/theme';

export default function TabLayout() {
  return <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:c.moss,
    tabBarInactiveTintColor:c.muted, tabBarStyle:{backgroundColor:c.white,borderTopColor:c.line},
    tabBarLabelStyle:{fontFamily:fonts.bold,fontSize:10}}}>
    <Tabs.Screen name="index" options={{title:'Today',tabBarIcon:({color,size})=><Icon name="today" color={typeof color === 'string' ? color : undefined} size={size} />}} />
    <Tabs.Screen name="explore" options={{title:'Explore',tabBarIcon:({color,size})=><Icon name="explore" color={typeof color === 'string' ? color : undefined} size={size} />}} />
    <Tabs.Screen name="progress" options={{title:'Progress',tabBarIcon:({color,size})=><Icon name="progress" color={typeof color === 'string' ? color : undefined} size={size} />}} />
    <Tabs.Screen name="profile" options={{title:'Profile',tabBarIcon:({color,size})=><Icon name="profile" color={typeof color === 'string' ? color : undefined} size={size} />}} />
  </Tabs>;
}

