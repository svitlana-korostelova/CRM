/**
 * Legacy dev / dummy testing screen (database, Redux, backend echo).
 *
 * Not part of the production tab UX. It is only mounted from `DashboardScreen` when
 * `DEV_TEST` is true — see `src/config/devFlags.ts` and `DashboardScreen.tsx`.
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {databaseService} from '../database/database';
import {BASE_URL} from '../store/api/api';
import {
  increment,
  decrement,
  setMessage,
  reset,
} from '../store/slices/appSlice';
import type {RootState} from '../store/store';

export const HomeScreen: React.FC = () => {
  const [dbStatus, setDbStatus] = useState<string>('Checking...');
  const [testResult, setTestResult] = useState<string>('');
  const [backendResult, setBackendResult] = useState<string>('');

  // Redux state
  const {counter, message, lastUpdated} = useSelector(
    (state: RootState) => state.app,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Check database status on mount
    const checkDatabase = async () => {
      try {
        const isReady = databaseService.isReady();
        setDbStatus(isReady ? '✅ Connected' : '❌ Not Ready');
        console.log('HomeScreen: Database status checked -', isReady);
      } catch (error) {
        setDbStatus('❌ Error');
        console.error('HomeScreen: Database check failed:', error);
      }
    };

    checkDatabase();
  }, []);

  // Log Redux state changes
  useEffect(() => {
    console.log('HomeScreen: Redux state updated -', {
      counter,
      message,
      lastUpdated: lastUpdated
        ? new Date(lastUpdated).toLocaleTimeString()
        : null,
    });
  }, [counter, message, lastUpdated]);

  const testDatabase = async () => {
    try {
      console.log('HomeScreen: Testing database operations...');

      // Test insert
      const id = await databaseService.insert('test_table', {
        name: 'Test Record',
        value: `Test at ${new Date().toISOString()}`,
      });
      console.log('HomeScreen: Inserted record with ID:', id);

      // Test query
      const records = await databaseService.select('test_table', 'id = ?', [
        id,
      ]);
      console.log('HomeScreen: Queried records:', records);

      // Test update
      const updated = await databaseService.update(
        'test_table',
        {value: 'Updated value'},
        'id = ?',
        [id],
      );
      console.log('HomeScreen: Updated rows:', updated);

      // Test query again
      const updatedRecord = await databaseService.select(
        'test_table',
        'id = ?',
        [id],
      );
      console.log('HomeScreen: Updated record:', updatedRecord);

      setTestResult(`✅ Success! Record ID: ${id}, Updated: ${updated} row(s)`);
      Alert.alert(
        'Database Test',
        `✅ Database operations successful!\n\nInserted ID: ${id}\nUpdated: ${updated} row(s)\n\nCheck Metro bundler terminal for detailed logs.`,
        [{text: 'OK'}],
      );
    } catch (error) {
      console.error('HomeScreen: Database test failed:', error);
      setTestResult(
        '❌ Error: ' + (error instanceof Error ? error.message : String(error)),
      );
      Alert.alert('Database Test Failed', String(error), [{text: 'OK'}]);
    }
  };

  const sendToBackend = async () => {
    try {
      setBackendResult('Sending...');
      const mockData = {
        source: 'CRM Mobile App',
        message: 'Hello from mobile!',
        timestamp: new Date().toISOString(),
        counter,
      };
      const res = await fetch(`${BASE_URL}/echo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(mockData),
      });
      const json = await res.json();
      setBackendResult(res.ok ? `✅ ${json.message}` : `❌ ${res.status}`);
      Alert.alert(
        'Backend Test',
        res.ok
          ? `Backend received your data!\n\nCheck the backend terminal to see:\n📱 Received from mobile: { ... }`
          : `Request failed: ${res.status}`,
        [{text: 'OK'}],
      );
    } catch {
      setBackendResult('❌ Error');
      Alert.alert(
        'Backend Test Failed',
        `Could not reach backend. Is it running on ${BASE_URL.replace(/\/api\/?$/, '')}?`,
        [{text: 'OK'}],
      );
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Welcome to CRM
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Your mobile-first customer relationship management system
          </Text>

          <View style={styles.statusContainer}>
            <Text variant="bodySmall" style={styles.statusLabel}>
              Database Status:
            </Text>
            <Text variant="bodySmall" style={styles.statusValue}>
              {dbStatus}
            </Text>
          </View>

          {/* Redux State Display */}
          <View style={styles.reduxContainer}>
            <Text variant="labelMedium" style={styles.reduxTitle}>
              Redux State Test:
            </Text>
            <View style={styles.reduxRow}>
              <Text variant="bodySmall">Counter: </Text>
              <Text variant="bodySmall" style={styles.counterValue}>
                {counter}
              </Text>
            </View>
            <View style={styles.reduxRow}>
              <Text variant="bodySmall">Message: </Text>
              <Text variant="bodySmall" style={styles.messageValue}>
                {message}
              </Text>
            </View>
            {lastUpdated && (
              <Text variant="bodySmall" style={styles.timestamp}>
                Updated: {new Date(lastUpdated).toLocaleTimeString()}
              </Text>
            )}
            <View style={styles.reduxButtons}>
              <Button
                mode="outlined"
                compact
                onPress={() => {
                  console.log('HomeScreen: Decrement button pressed');
                  dispatch(decrement());
                  console.log(
                    'HomeScreen: Counter after decrement:',
                    counter - 1,
                  );
                }}
                style={styles.reduxButton}>
                -
              </Button>
              <Button
                mode="outlined"
                compact
                onPress={() => {
                  console.log('HomeScreen: Increment button pressed');
                  dispatch(increment());
                  console.log(
                    'HomeScreen: Counter after increment:',
                    counter + 1,
                  );
                }}
                style={styles.reduxButton}>
                +
              </Button>
              <Button
                mode="outlined"
                compact
                onPress={() => {
                  console.log('HomeScreen: Set Message button pressed');
                  dispatch(setMessage('Redux works! 🎉'));
                  console.log(
                    'HomeScreen: Message updated to: Redux works! 🎉',
                  );
                }}
                style={styles.reduxButton}>
                Set Msg
              </Button>
              <Button
                mode="outlined"
                compact
                onPress={() => {
                  console.log('HomeScreen: Reset button pressed');
                  dispatch(reset());
                  console.log('HomeScreen: State reset to initial values');
                }}
                style={styles.reduxButton}>
                Reset
              </Button>
            </View>
          </View>

          {testResult ? (
            <Text variant="bodySmall" style={styles.testResult}>
              {testResult}
            </Text>
          ) : null}
          {backendResult ? (
            <Text variant="bodySmall" style={styles.testResult}>
              Backend: {backendResult}
            </Text>
          ) : null}
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="outlined"
            onPress={testDatabase}
            style={styles.testButton}>
            Test Database
          </Button>
          <Button
            mode="outlined"
            onPress={sendToBackend}
            style={styles.testButton}>
            Send to Backend
          </Button>
          <Button mode="contained" onPress={() => {}}>
            Get Started
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    elevation: 4,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  statusContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontWeight: '600',
    color: '#333',
  },
  statusValue: {
    fontWeight: '700',
    color: '#2196F3',
  },
  testResult: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#e8f5e9',
    borderRadius: 4,
    textAlign: 'center',
  },
  reduxContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  reduxTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#1976d2',
  },
  reduxRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  counterValue: {
    fontWeight: '700',
    color: '#2196F3',
    fontSize: 16,
  },
  messageValue: {
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  timestamp: {
    marginTop: 4,
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  reduxButtons: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  reduxButton: {
    flex: 1,
  },
  actions: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  testButton: {
    marginRight: 8,
  },
});
