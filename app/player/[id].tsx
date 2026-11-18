import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Icon } from '../../src/components/Icon';
import { Copy, Heading, IconButton, Label, PlaceholderArt, PrimaryButton, Ring, shared } from '../../src/components/ui';
import { featured, getSession, time } from '../../src/data/mock';
import { c, fonts, space } from '../../src/theme';

export default function Player() {
  const { id } = useLocalSearchParams<{id:string}>();
  const session = getSession(id);
  const { width, height } = useWindowDimensions();
  const [index,setIndex] = useState(session.id===featured.id ? 2 : 0);
  const [playing,setPlaying] = useState(false);
  const [muted,setMuted] = useState(false);
  const current = session.poses[index];
  const next = session.poses[index+1];
  const ringSize = Math.min(280, width - 40, Math.max(210, height - 365));
  const dismiss = () => router.canGoBack() ? router.back() : router.replace({pathname:'/session/[id]',params:{id:session.id}});
  const done = () => router.dismissTo('/');

  return <SafeAreaView style={styles.screen}>
    <StatusBar style="light" />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {current ? <>
        <View style={[shared.spread,styles.head]}>
          <IconButton icon="close" label="Close player" color={c.light} background={c.panel} onPress={dismiss} />
          <View style={styles.playerTitle}>
            <Label numberOfLines={1} style={styles.accent}>{session.title.toUpperCase()}</Label>
            <Copy style={styles.soft}>Pose {index+1} of {session.poses.length}</Copy>
          </View>
          <IconButton icon={muted?'mute':'sound'} label={muted?'Unmute':'Mute'} color={c.light}
            background={c.panel} onPress={()=>setMuted(value=>!value)} />
        </View>
        <View style={styles.segments} accessible accessibilityLabel={`Pose ${index+1} of ${session.poses.length}`}>
          {session.poses.map((_,step)=><View key={step} style={[styles.segment,
            step<index && styles.segmentDone,step===index && styles.segmentCurrent]} />)}
        </View>
        <View style={styles.center}>
          <View style={[styles.visual,{width:ringSize,height:ringSize}]}>
            <Ring size={ringSize} fraction={0.3} stroke={5} color={c.mint} track={c.panel} />
            <PlaceholderArt colors={session.art} style={[styles.inner,{width:ringSize-28,height:ringSize-28,borderRadius:ringSize}]} />
            <View style={styles.timer}><Copy style={styles.timerText}>{time(Math.round(current.seconds*.7))}</Copy></View>
          </View>
          <View style={styles.pose}>
            <Heading style={styles.poseName}>{current.name}</Heading>
            <Copy style={[styles.soft,styles.cue]}>{current.cue}</Copy>
          </View>
        </View>
        <View style={[shared.spread,styles.nextCard]}>
          <View style={styles.nextTitle}><Label style={styles.accent}>NEXT</Label>
            <Heading style={styles.nextName}>{next?.name ?? 'Session complete'}</Heading></View>
          {next && <Copy style={styles.soft}>{time(next.seconds)}</Copy>}
        </View>
        <View style={styles.controls}>
          <IconButton icon="previous" label="Previous pose" color={c.light} background={c.panel}
            disabled={index===0} onPress={()=>setIndex(value=>Math.max(0,value-1))} />
          <IconButton icon={playing?'pause':'play'} label={playing?'Pause':'Play'} color={c.dark} background={c.mint}
            size={29} style={styles.play} onPress={()=>setPlaying(value=>!value)} />
          <IconButton icon="next" label={next?'Next pose':'Finish session'} color={c.light}
            background={c.panel} onPress={()=>setIndex(value=>Math.min(session.poses.length,value+1))} />
        </View>
      </> : <View style={styles.complete}>
        <View style={styles.completeIcon}><Icon name="check" color={c.dark} size={32} /></View>
        <Heading style={styles.poseName}>Session complete</Heading>
        <Copy style={styles.soft}>{session.title} · {session.minutes} min</Copy>
        <PrimaryButton light label="Done" onPress={done} style={styles.done} />
      </View>}
    </ScrollView>
  </SafeAreaView>;
}
const styles=StyleSheet.create({
  screen:{flex:1,backgroundColor:c.dark},
  content:{flexGrow:1,paddingHorizontal:space.screen,paddingTop:9,paddingBottom:12,gap:14},
  head:{gap:10},playerTitle:{flex:1,alignItems:'center',gap:4},accent:{color:c.mint},soft:{color:'#C1CBC2',fontSize:13},
  segments:{flexDirection:'row',gap:5},segment:{flex:1,height:4,borderRadius:3,backgroundColor:c.panel},
  segmentDone:{backgroundColor:'#537963'},segmentCurrent:{backgroundColor:c.mint},
  center:{flex:1,alignItems:'center',justifyContent:'center',gap:27,paddingVertical:10},
  visual:{alignItems:'center',justifyContent:'center'},inner:{position:'absolute'},
  timer:{position:'absolute',bottom:-9,backgroundColor:c.light,borderRadius:24,paddingHorizontal:15,paddingVertical:5},
  timerText:{fontFamily:fonts.bold,color:c.dark,fontVariant:['tabular-nums']},
  pose:{alignItems:'center',gap:4},poseName:{color:c.light,fontSize:32,textAlign:'center'},cue:{textAlign:'center'},
  nextCard:{backgroundColor:c.panel,borderRadius:20,padding:13,gap:10},nextTitle:{gap:3,flex:1},
  nextName:{fontSize:18,color:c.light},controls:{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:20},
  play:{width:66,height:66},complete:{flex:1,alignItems:'center',justifyContent:'center',gap:10},
  completeIcon:{width:66,height:66,borderRadius:33,backgroundColor:c.mint,alignItems:'center',justifyContent:'center',marginBottom:8},
  done:{minWidth:140,marginTop:12},
});

