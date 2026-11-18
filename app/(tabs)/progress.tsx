import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon } from '../../src/components/Icon';
import { Copy, Heading, Page, Ring, StatCard, shared } from '../../src/components/ui';
import { recent, week } from '../../src/data/mock';
import { c, fonts } from '../../src/theme';

export default function Progress() {
  const total = week.minutes.reduce((sum,minutes)=>sum+minutes,0);
  const fraction = total/week.goal;
  const max = Math.max(...week.minutes);
  return <Page>
    <Heading>Progress</Heading>
    <View style={styles.stats}>
      <StatCard value={String(week.streak)} label="Day streak" />
      <StatCard value={String(week.sessions)} label="Sessions" />
      <StatCard value={week.hours} label="Total time" />
    </View>
    <View style={[shared.card,styles.week]}>
      <View style={shared.spread}>
        <View style={styles.goal}><Heading style={shared.sectionTitle}>This week</Heading>
          <Copy style={shared.muted}>{total} of {week.goal} min goal</Copy></View>
        <View accessible accessibilityLabel={`${Math.round(fraction*100)} percent of weekly goal`} style={styles.ring}>
          <Ring size={60} fraction={fraction} />
          <Copy style={styles.percentage}>{Math.round(fraction*100)}%</Copy>
        </View>
      </View>
      <View style={styles.chart}>
        {week.minutes.map((minutes,index)=><View key={index} style={styles.column} accessible
          accessibilityLabel={`${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][index]}, ${minutes} minutes`}>
          <View style={styles.barArea}><Copy style={styles.chartLabel}>{minutes}</Copy>
            <View style={[styles.bar,{height:minutes ? minutes/max*90 : 5},
              !minutes && styles.empty,index===week.today && styles.today]} /></View>
          <Copy style={[styles.chartLabel,index===week.today && styles.todayLabel]}>{week.days[index]}</Copy>
        </View>)}
      </View>
    </View>
    <View style={styles.recent}>
      <Heading style={shared.sectionTitle}>Recent</Heading>
      <View style={styles.list}>
        {recent.map(({session,date},index)=><Pressable key={session.id} accessibilityRole="button"
          onPress={()=>router.push({pathname:'/session/[id]',params:{id:session.id}})}
          style={({pressed})=>[shared.row,styles.recentRow,index>0 && styles.divider,pressed && shared.pressed]}>
          <View style={[styles.swatch,{backgroundColor:session.tint}]}><Icon name={session.icon} size={19} /></View>
          <View style={styles.goal}><Heading style={{fontSize:17}}>{session.title}</Heading>
            <Copy style={styles.chartLabel}>{date} · {session.minutes} min</Copy></View>
          <Icon name="chevron" size={17} />
        </Pressable>)}
      </View>
    </View>
  </Page>;
}
const styles=StyleSheet.create({
  stats:{flexDirection:'row',gap:8},week:{gap:16},goal:{flex:1,gap:3},
  ring:{alignItems:'center',justifyContent:'center'},percentage:{position:'absolute',fontFamily:fonts.bold,fontSize:12,color:c.moss},
  chart:{flexDirection:'row',gap:7},column:{flex:1,alignItems:'center',gap:8},
  barArea:{height:112,justifyContent:'flex-end',alignItems:'center',gap:4},
  bar:{width:23,borderRadius:6,backgroundColor:'#A7BEA9'},empty:{backgroundColor:c.line},today:{backgroundColor:c.moss},
  chartLabel:{color:c.muted,fontSize:11},todayLabel:{fontFamily:fonts.bold,color:c.moss},
  recent:{gap:10},list:{backgroundColor:c.white,borderRadius:24,paddingHorizontal:13},
  recentRow:{minHeight:66,gap:12},swatch:{width:40,height:40,borderRadius:13,alignItems:'center',justifyContent:'center'},
  divider:{borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:c.line},
});

