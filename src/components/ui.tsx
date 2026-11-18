import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { StyleProp, TextProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Ellipse } from 'react-native-svg';
import { c, fonts, radii, space } from '../theme';
import type { Palette, Session } from '../data/mock';
import { Icon, type IconName } from './Icon';

export function Copy({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.copy, style]} />;
}
export function Heading({ style, ...props }: TextProps) {
  return <Text accessibilityRole="header" {...props} style={[styles.heading, style]} />;
}
export function Label({ style, ...props }: TextProps) {
  return <Copy {...props} style={[styles.label, style]} />;
}
export function Page({ children }: { children: ReactNode }) {
  return <SafeAreaView edges={['top','left','right']} style={styles.page}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>{children}</ScrollView>
  </SafeAreaView>;
}
export function PlaceholderArt({ colors, style }: { colors: Palette; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.art, { backgroundColor: colors[0] }, style]} accessible={false}>
    <Svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
      <Circle cx={185} cy={66} r={27} fill={colors[1]} />
      <Ellipse cx={63} cy={213} rx={166} ry={93} fill={colors[2]} />
      <Ellipse cx={255} cy={244} rx={193} ry={120} fill={colors[3]} />
    </Svg>
  </View>;
}
export function PrimaryButton({ label, onPress, light, style }:
  { label:string; onPress:()=>void; light?:boolean; style?:StyleProp<ViewStyle> }) {
  return <Pressable accessibilityRole="button" onPress={onPress}
    style={({pressed}) => [styles.button, light && {backgroundColor:c.white}, style, pressed && styles.pressed]}>
    <Copy style={[styles.buttonText, light && {color:c.moss}]}>{label}</Copy>
  </Pressable>;
}
export function IconButton({ icon, label, onPress, color, background, selected, disabled, style, size }:
  { icon:IconName; label:string; onPress:()=>void; color?:string; background?:string;
    selected?:boolean; disabled?:boolean; style?:StyleProp<ViewStyle>; size?:number }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label}
    accessibilityState={{selected,disabled}} disabled={disabled} onPress={onPress}
    style={({pressed}) => [styles.iconButton, {backgroundColor:background ?? c.white}, style,
      (pressed || disabled) && styles.pressed]}>
    <Icon name={icon} color={color} filled={selected || icon === 'play'} size={size} />
  </Pressable>;
}
export function Chip({ label, selected, onPress, compact }:
  { label:string; selected:boolean; onPress:()=>void; compact?:boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{selected}} onPress={onPress}
    style={({pressed}) => [styles.chip, compact && styles.compact, selected && {backgroundColor:c.moss},
      pressed && styles.pressed]}>
    <Copy style={{fontFamily:fonts.bold,fontSize:compact ? 11 : 13,color:selected ? c.white : c.ink}}>{label}</Copy>
  </Pressable>;
}
export function StatCard({ label, value }: { label:string; value:string }) {
  return <View style={styles.stat}><Heading style={styles.statValue}>{value}</Heading>
    <Copy style={styles.statLabel}>{label}</Copy></View>;
}
export function ProgressBar({ fraction }: { fraction:number }) {
  return <View style={styles.track} accessibilityRole="progressbar"
    accessibilityValue={{min:0,max:100,now:Math.round(fraction*100)}}>
    <View style={[styles.fill,{width:`${fraction*100}%`}]} />
  </View>;
}
export function Ring({ size, fraction, stroke = 5, color = c.moss, track = c.chip }:
  { size:number; fraction:number; stroke?:number; color?:string; track?:string }) {
  const center = size / 2;
  const r = center - stroke / 2 - 1;
  const length = 2 * Math.PI * r;
  return <Svg width={size} height={size} accessible={false}>
    <Circle cx={center} cy={center} r={r} stroke={track} strokeWidth={stroke} fill="none" />
    <Circle cx={center} cy={center} r={r} stroke={color} strokeWidth={stroke} fill="none"
      strokeLinecap="round" strokeDasharray={[length,length]} strokeDashoffset={length*(1-fraction)}
      rotation={-90} originX={center} originY={center} />
  </Svg>;
}
export function SessionTile({ session, onPress, quick = false }:
  { session:Session; onPress:()=>void; quick?:boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress}
    style={({pressed}) => [quick ? styles.quick : styles.tile, quick && {backgroundColor:session.tint},
      pressed && styles.pressed]}>
    {quick ? <>
      <View style={styles.quickIcon}><Icon name={session.icon} size={18} /></View>
      <View><Heading style={styles.tileTitle}>{session.title}</Heading>
        <Copy style={styles.meta}>{session.minutes} min</Copy></View>
    </> : <>
      <View><PlaceholderArt colors={session.art} style={styles.tileArt} />
        <View style={styles.badge}><Copy style={styles.badgeText}>{session.minutes} min</Copy></View></View>
      <View style={styles.tileBody}><Heading style={styles.tileTitle}>{session.title}</Heading>
        <Copy style={styles.meta}>{session.category} · {session.level}</Copy></View>
    </>}
  </Pressable>;
}
export const shared = StyleSheet.create({
  card:{backgroundColor:c.white,borderRadius:radii.card,padding:space.card},
  row:{flexDirection:'row',alignItems:'center'},
  spread:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  sectionTitle:{fontSize:23},
  muted:{color:c.muted},
  pressed:{opacity:.65},
});
const styles = StyleSheet.create({
  copy:{fontFamily:fonts.body,color:c.ink,fontSize:14},
  heading:{fontFamily:fonts.heading,color:c.ink,fontSize:36,letterSpacing:-.55},
  label:{fontFamily:fonts.bold,fontSize:10,letterSpacing:1.5,color:c.moss},
  page:{flex:1,backgroundColor:c.bg},
  content:{paddingHorizontal:space.screen,paddingTop:12,paddingBottom:24,gap:space.section},
  art:{overflow:'hidden'},
  button:{minHeight:52,borderRadius:radii.button,backgroundColor:c.moss,paddingHorizontal:18,
    alignItems:'center',justifyContent:'center'},
  buttonText:{fontFamily:fonts.bold,fontSize:14,color:c.white},
  iconButton:{width:48,height:48,borderRadius:radii.pill,alignItems:'center',justifyContent:'center'},
  pressed:{opacity:.65},
  chip:{minHeight:44,paddingHorizontal:16,backgroundColor:c.chip,borderRadius:radii.pill,
    alignItems:'center',justifyContent:'center'},
  compact:{paddingHorizontal:9,minWidth:44},
  stat:{flex:1,minWidth:0,borderRadius:20,backgroundColor:c.white,paddingVertical:13,paddingHorizontal:6,
    alignItems:'center',justifyContent:'center',gap:3},
  statValue:{fontSize:19,textAlign:'center'},
  statLabel:{fontSize:11,color:c.muted,textAlign:'center'},
  track:{height:6,borderRadius:4,backgroundColor:c.chip,overflow:'hidden'},
  fill:{height:'100%',backgroundColor:c.moss,borderRadius:4},
  quick:{width:139,minHeight:113,borderRadius:20,padding:12,gap:9,justifyContent:'space-between'},
  quickIcon:{height:30,width:30,borderRadius:15,backgroundColor:'#FFFFFF80',alignItems:'center',justifyContent:'center'},
  tile:{width:'48%',borderRadius:20,overflow:'hidden',backgroundColor:c.white},
  tileArt:{height:116},
  tileBody:{padding:11,gap:3},
  tileTitle:{fontSize:17,letterSpacing:-.2},
  meta:{fontSize:11,color:c.muted},
  badge:{position:'absolute',bottom:8,left:8,backgroundColor:c.white,borderRadius:20,paddingVertical:4,paddingHorizontal:8},
  badgeText:{fontFamily:fonts.bold,fontSize:10},
});

