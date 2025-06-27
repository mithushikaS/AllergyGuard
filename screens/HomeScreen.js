import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../contexts/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.logo}>AllergyGuard</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigateTo('Profile')}>
            <FontAwesome name="user-circle" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://api.a0.dev/assets/image?text=allergysafe app hero image&aspect=16:9' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Stay Safe from Allergens</Text>
            <Text style={styles.heroSubtitle}>
              Scan products to check if they're safe for you
            </Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.scanButton]} 
            onPress={() => navigateTo('ScanProduct')}
          >
            <FontAwesome name="camera" size={32} color="#fff" />
            <Text style={styles.actionButtonText}>Scan Product</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.searchButton]} 
            onPress={() => navigateTo('SearchProduct')}
          >
            <FontAwesome name="search" size={32} color="#fff" />
            <Text style={styles.actionButtonText}>Search Product</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          <View style={styles.recentScansEmpty}>
            <Text style={styles.emptyText}>No recent scans</Text>
            <Text style={styles.emptySubText}>Scanned products will appear here</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expert Help</Text>
          <TouchableOpacity 
            style={styles.expertHelpCard}
            onPress={() => navigateTo('ExpertHelp')}
          >
            <FontAwesome name="user-md" size={32} color="#4C6EF5" />
            <View style={styles.expertHelpText}>
              <Text style={styles.expertHelpTitle}>Connect with a Health Expert</Text>
              <Text style={styles.expertHelpSubtitle}>
                Get advice from doctors and pharmacists about your allergies
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allergy Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Read labels carefully</Text>
            <Text style={styles.tipText}>
              Manufacturers may change ingredients without notice. Always double-check labels, 
              even for products you regularly use.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerTab} onPress={() => {}}>
          <FontAwesome name="home" size={24} color="#4C6EF5" />
          <Text style={[styles.footerTabText, styles.activeTab]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerTab} onPress={() => navigateTo('ScanProduct')}>
          <FontAwesome name="camera" size={24} color="#888" />
          <Text style={styles.footerTabText}>Scan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerTab} onPress={() => navigateTo('MyAllergies')}>
          <FontAwesome name="exclamation-circle" size={24} color="#888" />
          <Text style={styles.footerTabText}>My Allergies</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerTab} onPress={() => navigateTo('Profile')}>
          <FontAwesome name="user" size={24} color="#888" />
          <Text style={styles.footerTabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileButton: {
    padding: 5,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    padding: 5,
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: 180,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 180,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  heroTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    height: 110,
  },
  scanButton: {
    backgroundColor: '#4C6EF5',
  },
  searchButton: {
    backgroundColor: '#38B2AC',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginTop: 10,
    fontSize: 16,
  },
  section: {
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  recentScansEmpty: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  emptySubText: {
    color: '#999',
    marginTop: 5,
  },
  expertHelpCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expertHelpText: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  expertHelpTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  expertHelpSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  tipCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  tipText: {
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerTab: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerTabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  activeTab: {
    color: '#4C6EF5',
    fontWeight: '600',
  }
});

