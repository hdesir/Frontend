  import SelectDropdown from 'react-native-select-dropdown'
  import { Text, View} from '@/components/Themed';
  import { ImageBackground, StyleSheet, Image, ScrollView, FlatList, ActivityIndicator, RefreshControl, VirtualizedListWithoutRenderItemProps } from 'react-native';

  const emojisWithIcons = [
    {title: 'New', icon: 'Music'},
    {title: 'Live', icon: 'LivePerformances'},
    {title: 'Gospel', icon: 'Gospel' },
    {title: 'Direk', icon: '2000s'},
    {title: 'Retro', icon: '1990s'},
    {title: 'Orchaestra', icon: 'formal'},
    {title: 'Rap', icon: 'Rap'},
 
  ];
  
  <SelectDropdown
    data={emojisWithIcons}
    onSelect={(selectedItem, index) => {
      const query = selectedItem.category
      console.log(selectedItem, index);
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          {selectedItem}
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || 'Trending'}
          </Text>
          
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          {/* <Text style={styles.dropdownItemTxtStyle}>Placeholder</Text> */}
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={{backgroundColor: '#444546ff',
        borderRadius: 8,}}
  />

  const styles = StyleSheet.create({
    
     dropdownButtonStyle: {
        width: 125,
        height: 50,
        backgroundColor: '#515253ff',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 5
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#fcfcfcff',
      },
      dropdownButtonArrowStyle: {
        fontSize: 28,
      },
      dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      dropdownMenuStyle: {
        backgroundColor: '#444546ff',
        borderRadius: 8,
      },
      dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#ffffffff',
      },
      dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      imageo: {
      flex: 1,
      justifyContent: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', // Black color with 50% opacity
    },
    text: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    }
    });
    
  ;
  
