import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon } from '../../src/components/Icon';
import { Copy, Heading, Page, shared } from '../../src/components/ui';
import { c } from '../../src/theme';

const settings = ['Practice preferences','Reminders','About Serein'];

export default function Profile() {
  const [selected, setSelected] = useState<string | null>(null);
  return <Page>
    <Heading>Profile</Heading>
    <View style={[shared.card,styles.profile]}>
      <View style={styles.avatar}><Icon name="profile" size={34} /></View>
      <Heading style={shared.sectionTitle}>Alex Morgan</Heading>
    </View>
    <View style={styles.settings}>
      {settings.map((label,index)=><Pressable key={label} accessibilityRole="button"
        accessibilityState={{selected:selected===label}} onPress={()=>setSelected(current=>current===label ? null : label)}
        style={({pressed})=>[shared.spread,styles.setting,index>0 && styles.divider,pressed && shared.pressed]}>
        <View><Copy>{label}</Copy>{selected===label && <Copy style={shared.muted} accessibilityLiveRegion="polite">Preview only</Copy>}</View><Icon name="chevron" size={17} />
      </Pressable>)}
    </View>
  </Page>;
}
const styles=StyleSheet.create({
  profile:{alignItems:'center',gap:10,paddingVertical:24},
  avatar:{width:78,height:78,borderRadius:39,backgroundColor:c.sage,alignItems:'center',justifyContent:'center'},
  settings:{backgroundColor:c.white,borderRadius:24,paddingHorizontal:16},
  setting:{minHeight:54},divider:{borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:c.line},
});

