import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found or network error');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>Error: {error || 'User not found'}</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <View style={styles.headerSection}>
          <ThemedText style={styles.name}>{user.name}</ThemedText>
          <ThemedText style={styles.username}>@{user.username}</ThemedText>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoSection}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <ThemedText style={styles.value}>{user.email}</ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText style={styles.label}>Phone</ThemedText>
          <ThemedText style={styles.value}>{user.phone}</ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText style={styles.label}>Website</ThemedText>
          <ThemedText style={styles.value}>{user.website}</ThemedText>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoSection}>
          <ThemedText style={styles.label}>Company</ThemedText>
          <ThemedText style={styles.value}>{user.company.name}</ThemedText>
          <ThemedText style={styles.subValue}>"{user.company.catchPhrase}"</ThemedText>
        </View>

        <View style={styles.infoSection}>
          <ThemedText style={styles.label}>Address</ThemedText>
          <ThemedText style={styles.value}>
            {user.address.suite}, {user.address.street}
          </ThemedText>
          <ThemedText style={styles.value}>
            {user.address.city}, {user.address.zipcode}
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', 
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8, 
    padding: 24,

    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  headerSection: {
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000', 
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#666666',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA', 
    marginVertical: 16,
  },
  infoSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  subValue: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    marginTop: 2,
  },
  errorText: {
    color: '#000000',
    fontSize: 16,
  },
});
