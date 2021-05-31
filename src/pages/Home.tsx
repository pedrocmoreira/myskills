import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

//Utilizo a interface para saber como os objetos têm que ser
//Qual atributo e qual tipo vai ter um dato do tipo Skill
interface SkillData {
  id: string;
  name: string;
  date?: Date; //Quando tem uma interrogação antes dos dois pontos, o typescript entende que não é obrigatório 
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMyskills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMyskills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMyskills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting('Good afternoon');
    } else {
      setGretting('Good night');
    }

  }, [mySkills])

  return (
    <View style={styles.container}>


      <Text style={styles.title}>
        Welcome, Pedro
      </Text>

      <Text style={styles.gretting}>
        {gretting}
      </Text>


      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button
        onPress={handleAddNewSkill}
        title="Add"
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  gretting: {
    color: '#FFF'
  }
});
