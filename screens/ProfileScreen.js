import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [languagePreference, setLanguagePreference] = useState('English');

  const languages = ['English', 'Sinhala', 'Tamil'];
  
  const goBack = () => {
    navigation.goBack();
  };

  const saveProfile = () => {
    // Save profile logic would go here
    toast.success('Profile updated successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <FontAwesome name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileImageSection}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=user+profile&aspect=1:1' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editProfileButton}>
            <FontAwesome name="camera" size={16} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Emergency Contact</Text>
            <TextInput
              style={styles.input}
              value={emergencyContact}
              onChangeText={setEmergencyContact}
              placeholder="Emergency contact number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.switchGroup}>
            <View style={styles.switchTextGroup}>
              <Text style={styles.switchLabel}>Enable Notifications</Text>
              <Text style={styles.switchDescription}>Get alerts about potentially harmful products</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#e0e0e0", true: "#4C6EF5" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.preferenceGroup}>
            <Text style={styles.preferenceLabel}>Language</Text>
            <View style={styles.languageOptions}>
              {languages.map(lang => (
                <TouchableOpacity 
                  key={lang}
                  style={[
                    styles.languageOption,
                    languagePreference === lang && styles.selectedLanguageOption
                  ]}
                  onPress={() => setLanguagePreference(lang)}
                >
                  <Text 
                    style={[
                      styles.languageText,
                      languagePreference === lang && styles.selectedLanguageText
                    ]}
                  >
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('MyAllergies')}
        >
          <View style={styles.actionButtonContent}>
            <FontAwesome name="exclamation-circle" size={24} color="#4C6EF5" />
            <Text style={styles.actionButtonText}>Manage My Allergies</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>
                <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ScanHistory')}
        >
          <View style={styles.actionButtonContent}>
            <FontAwesome name="history" size={24} color="#4C6EF5" />
            <Text style={styles.actionButtonText}>Scan History</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('HelpSupport')}
        >
          <View style={styles.actionButtonContent}>
            <FontAwesome name="question-circle" size={24} color="#4C6EF5" />
            <Text style={styles.actionButtonText}>Help & Support</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dangerButton}>
          <FontAwesome name="sign-out" size={24} color="#DC2626" />
          <Text style={styles.dangerButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ... styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    backgroundColor: '#4C6EF5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#4C6EF5',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  formSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#f5f5f7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchTextGroup: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  switchDescription: {
    fontSize: 14,
    color: '#777',
  },
  preferenceGroup: {
    marginBottom: 20,
  },
  preferenceLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  languageOptions: {
    flexDirection: 'row',
  },
  languageOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f7',
    marginRight: 10,
  },
  selectedLanguageOption: {
    backgroundColor: '#4C6EF5',
  },
  languageText: {
    color: '#555',
    fontWeight: '500',
  },
  selectedLanguageText: {
    color: '#ffffff',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    marginBottom: 30,
  },
  dangerButtonText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '500',
    marginLeft: 12,
  },
  saveButton: {
    backgroundColor: '#4C6EF5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    margin: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});