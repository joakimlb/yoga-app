import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Copy, Heading, IconButton, Label, PlaceholderArt, PrimaryButton, StatCard, shared } from '../../src/components/ui';
import { getSession, time } from '../../src/data/mock';
import { c, fonts, space } from '../../src/theme';

export default function SessionDetail() {
  const { id } = useLocalSearchParams<{id:string}>();
  const session = getSession(id);
  const { top } = useSafeAreaInsets();
  const [favorite,setFavorite] = useState(false);
  const [showDownloadNote, setShowDownloadNote] = useState(false);
  return <View style={styles.screen}>
    <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="never">
      <View style={styles.hero}>
        <PlaceholderArt colors={session.art} style={StyleSheet.absoluteFill} />
        <View style={[shared.spread,styles.heroActions,{top:top+8}]}>
          <IconButton icon="back" label="Go back" onPress={()=>router.canGoBack()?router.back():router.replace('/')} />
          <IconButton icon="heart" label={favorite?'Remove from favorites':'Add to favorites'} selected={favorite}
            onPress={()=>setFavorite(value=>!value)} />
        </View>
      </View>
      <View style={styles.sheet}>
        <View style={styles.title}><Label>{session.category.toUpperCase()}</Label><Heading>{session.title}</Heading></View>
        <View style={styles.stats}>
          <StatCard label="Duration" value={`${session.minutes} min`} />
          <StatCard label="Level" value={session.level} />
          <StatCard label="Intensity" value={session.intensity} />
        </View>
        <Copy style={styles.description}>{session.description}</Copy>
        <View style={styles.sequence}>
          <Heading style={shared.sectionTitle}>Sequence · {session.poses.length} poses</Heading>
          <View style={styles.list}>
            {session.poses.map((pose,index)=><View key={index} style={[shared.row,styles.pose,index>0 && styles.divider]}>
              <View style={styles.number}><Copy style={styles.numberText}>{index+1}</Copy></View>
              <Copy style={styles.poseTitle}>{pose.name}</Copy>
              <Copy style={shared.muted}>{time(pose.seconds)}</Copy>
            </View>)}
          </View>
        </View>
      </View>
    </ScrollView>
    <SafeAreaView edges={['bottom','left','right']} style={styles.footer}>
      {showDownloadNote && <Copy style={styles.downloadNote} accessibilityLiveRegion="polite">Downloads are preview-only.</Copy>}
      <View style={[shared.row,styles.footerContent]}>
        <IconButton icon="download" label="Download session" style={styles.download}
          onPress={()=>setShowDownloadNote(value=>!value)} />
        <PrimaryButton label="Start practice" style={styles.start}
          onPress={()=>router.push({pathname:'/player/[id]',params:{id:session.id}})} />
      </View>
    </SafeAreaView>
  </View>;
}
const styles=StyleSheet.create({
  screen:{flex:1,backgroundColor:c.bg},hero:{height:290},
  heroActions:{position:'absolute',left:space.screen,right:space.screen},
  sheet:{marginTop:-25,borderTopLeftRadius:28,borderTopRightRadius:28,backgroundColor:c.bg,padding:space.screen,gap:16},
  title:{gap:4},stats:{flexDirection:'row',gap:8},description:{color:c.muted,lineHeight:22},
  sequence:{gap:9},list:{backgroundColor:c.white,borderRadius:20,paddingHorizontal:12},
  pose:{minHeight:50,gap:10},poseTitle:{flex:1,fontFamily:fonts.bold},
  divider:{borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:c.line},
  number:{backgroundColor:c.chip,width:27,height:27,borderRadius:14,alignItems:'center',justifyContent:'center'},
  numberText:{fontSize:11,fontFamily:fonts.bold,color:c.moss},
  footer:{backgroundColor:c.bg,borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:c.line},
  footerContent:{gap:10,paddingHorizontal:space.screen,paddingVertical:9},
  download:{width:52,height:52,borderRadius:18,borderWidth:1,borderColor:c.line},
  downloadNote:{textAlign:'center',color:c.muted,paddingTop:8},
  start:{flex:1},
});

