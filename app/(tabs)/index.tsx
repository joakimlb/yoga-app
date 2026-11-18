import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Icon } from '../../src/components/Icon';
import { Copy, Heading, Label, Page, PlaceholderArt, PrimaryButton, ProgressBar, SessionTile, shared } from '../../src/components/ui';
import { featured, program, quick, week } from '../../src/data/mock';
import { c, fonts, radii } from '../../src/theme';

const open = (id:string) => router.push({pathname:'/session/[id]',params:{id}});

export default function Today() {
  return <Page>
    <View style={styles.welcome}>
      <Label>FRIDAY, 16 OCTOBER</Label>
      <View style={[shared.spread,styles.greeting]}>
        <Heading style={styles.greetingTitle}>Good evening</Heading>
        <View style={styles.streak}><Icon name="fire" size={15} />
          <Copy style={styles.streakText}>{week.streak}-day streak</Copy></View>
      </View>
    </View>

    <View style={styles.hero}>
      <PlaceholderArt colors={featured.art} style={styles.heroArt} />
      <View style={styles.heroContent}>
        <Label style={styles.heroLabel}>TODAY’S PRACTICE</Label>
        <Heading style={styles.heroTitle}>{featured.title}</Heading>
        <Copy style={styles.heroMeta}>{featured.minutes} min · Gentle flow · {featured.level}</Copy>
        <PrimaryButton label="Start session" light onPress={()=>open(featured.id)} style={styles.heroButton} />
      </View>
    </View>

    <View style={[shared.card,styles.week]}>
      <Label>THIS WEEK</Label>
      <View style={styles.days}>
        {week.days.map((day,index)=><View key={index} style={styles.day}
          accessibilityLabel={`${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][index]}, ${week.done[index]?'done':index===week.today?'today':'upcoming'}`}>
          <Copy style={styles.dayLabel}>{day}</Copy>
          <View style={[styles.dayCircle,week.done[index] && styles.dayDone,index===week.today && styles.dayToday]}>
            {week.done[index] && <Icon name="check" color={c.white} size={13} />}
            {index===week.today && <View style={styles.dot} />}
          </View>
        </View>)}
      </View>
    </View>

    <View style={styles.quick}>
      <View style={shared.spread}>
        <Heading style={shared.sectionTitle}>Quick sessions</Heading>
        <Pressable accessibilityRole="button" onPress={()=>router.navigate('/explore')}
          style={({pressed})=>[styles.seeAll,pressed && shared.pressed]}>
          <Copy style={styles.link}>See all</Copy><Icon name="chevron" size={14} />
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
        {quick.map(session=><SessionTile quick key={session.id} session={session} onPress={()=>open(session.id)} />)}
      </ScrollView>
    </View>

    <View style={styles.program}>
      <Heading style={shared.sectionTitle}>Continue program</Heading>
      <Pressable accessibilityRole="button" onPress={()=>open(program.session.id)}
        style={({pressed})=>[shared.card,shared.row,styles.programCard,pressed && shared.pressed]}>
        <View style={styles.programIcon}><Icon name="layers" /></View>
        <View style={styles.programBody}>
          <Heading style={{fontSize:18}}>{program.title}</Heading>
          <Copy style={styles.dayLabel}>Day {program.day} of {program.total}</Copy>
          <ProgressBar fraction={program.day/program.total} />
        </View>
        <Icon name="chevron" size={16} />
      </Pressable>
    </View>
  </Page>;
}

const styles=StyleSheet.create({
  welcome:{gap:4},greeting:{gap:8},greetingTitle:{fontSize:35,flexShrink:1},
  streak:{flexDirection:'row',alignItems:'center',gap:5,backgroundColor:c.sage,borderRadius:radii.pill,padding:8},
  streakText:{fontFamily:fonts.bold,fontSize:10,color:c.moss},
  hero:{minHeight:184,backgroundColor:c.moss,borderRadius:26,overflow:'hidden'},
  heroArt:{position:'absolute',right:0,top:0,bottom:0,width:'40%'},
  heroContent:{padding:16,alignItems:'flex-start',gap:5,width:'63%'},
  heroLabel:{color:'#DFEADF'},heroTitle:{color:c.white,fontSize:28,lineHeight:29},
  heroMeta:{color:'#EBF1EB',fontSize:11},heroButton:{marginTop:8,minHeight:44,borderRadius:radii.pill,paddingHorizontal:14},
  week:{gap:9},days:{flexDirection:'row',justifyContent:'space-between'},
  day:{alignItems:'center',gap:5,flex:1},dayLabel:{color:c.muted,fontSize:11},
  dayCircle:{width:27,height:27,borderRadius:14,backgroundColor:c.chip,alignItems:'center',justifyContent:'center'},
  dayDone:{backgroundColor:c.moss},dayToday:{borderColor:c.moss,borderWidth:1.5,backgroundColor:c.white},
  dot:{width:5,height:5,borderRadius:3,backgroundColor:c.moss},
  quick:{gap:2},rail:{gap:10,paddingRight:4},
  seeAll:{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:2,minHeight:44,minWidth:60},
  link:{color:c.moss,fontFamily:fonts.bold,fontSize:12},program:{gap:9},programCard:{gap:12},
  programIcon:{width:46,height:46,borderRadius:16,backgroundColor:c.sage,alignItems:'center',justifyContent:'center'},
  programBody:{flex:1,gap:4},
});

