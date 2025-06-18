import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const buttonWidth = (width - 80) / 2;

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a1a1a',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  heroSubtitle: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  heroBtnPrimary: {
    backgroundColor: '#ed1d24',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: buttonWidth,
    marginRight: 10,
  },
  heroBtnSecondary: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: buttonWidth,
  },
  heroBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
    backgroundColor: '#1a1a1a',
  },
  featuresTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    marginTop: 32,
  },
  featuresGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#232323',
    borderRadius: 12,
    padding: 20,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureCardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    textAlign: 'center',
  },
  featureCardText: {
    color: '#ccc',
    fontSize: 15,
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: 0,
    marginTop: 10,
    backgroundColor: '#1a1a1a',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#232323',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#ed1d24',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 2,
  },
  statLabel: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },
}); 