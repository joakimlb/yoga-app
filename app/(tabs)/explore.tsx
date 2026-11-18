import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Icon } from '../../src/components/Icon';
import { Chip, Copy, Heading, IconButton, Page, SessionTile, shared } from '../../src/components/ui';
import { sessions } from '../../src/data/mock';
import { c, fonts } from '../../src/theme';

const categories = ['All','Flow','Yin','Strength','Breath','Sleep'] as const;
const durations = ['Any','≤10','20','30+'] as const;

export default function Explore() {
  const [query,setQuery] = useState('');
  const [category,setCategory] = useState<(typeof categories)[number]>('All');
  const [duration,setDuration] = useState<(typeof durations)[number]>('Any');
  const filtered = sessions.filter(session => {
    const matchesDuration = duration === 'Any' || (duration === '≤10' && session.minutes <= 10)
      || (duration === '20' && session.minutes === 20) || (duration === '30+' && session.minutes >= 30);
    return session.title.toLowerCase().includes(query.trim().toLowerCase())
      && (category === 'All' || category === session.category) && matchesDuration;
  });
  return <Page>
    <Heading>Explore</Heading>
    <View style={[shared.row,styles.search]}>
      <Icon name="search" size={20} />
      <TextInput accessibilityLabel="Search session titles" placeholder="Poses, styles, teachers"
        placeholderTextColor={c.muted} value={query} onChangeText={setQuery}
        autoCorrect={false} returnKeyType="search" style={styles.input} />
      {!!query && <IconButton icon="close" label="Clear search" onPress={()=>setQuery('')} style={styles.clear} size={16} />}
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.chips}>
      {categories.map(item=><Chip key={item} label={item} selected={item===category} onPress={()=>setCategory(item)} />)}
    </ScrollView>
    <View style={styles.results}>
      <View style={[shared.spread,styles.toolbar]}>
        <Copy accessibilityLiveRegion="polite" style={styles.count}>{filtered.length} {filtered.length===1?'session':'sessions'}</Copy>
        <View style={styles.segment} accessibilityLabel="Duration">
          {durations.map(item=><Chip key={item} compact label={item} selected={item===duration} onPress={()=>setDuration(item)} />)}
        </View>
      </View>
      {filtered.length ? <View style={styles.grid}>
        {filtered.map(session=><SessionTile key={session.id} session={session}
          onPress={()=>router.push({pathname:'/session/[id]',params:{id:session.id}})} />)}
      </View> : <View style={shared.card}><Heading style={shared.sectionTitle}>No matching sessions</Heading>
        <Copy style={shared.muted}>Try another title or clear a filter.</Copy></View>}
    </View>
  </Page>;
}

const styles=StyleSheet.create({
  search:{backgroundColor:c.white,borderColor:c.line,borderWidth:1,borderRadius:18,paddingLeft:14,gap:8},
  input:{flex:1,minHeight:50,fontFamily:fonts.body,fontSize:14,color:c.ink,paddingRight:10},
  clear:{width:44,height:44},chips:{gap:7},results:{gap:12},
  toolbar:{gap:8},count:{fontSize:13,fontFamily:fonts.bold},segment:{flexDirection:'row',backgroundColor:c.chip,borderRadius:999},
  grid:{flexDirection:'row',flexWrap:'wrap',columnGap:'4%',rowGap:12},
});

