import React, {useState, useEffect} from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import metrics from '../../constant/metrics';
import CustomHeader from '../../components/CustomHeader';
import colors from '../../constant/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {Button, Input} from '@rneui/themed';
import CalendarPicker from 'react-native-calendar-picker';
import moment, {Moment} from 'moment';
import _ from 'lodash';

const MMKV = new MMKVLoader().withEncryption().initialize();

const DashboardScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  type dateType = {
    date: string;
    eventName: string;
    id: string;
  };

  const [eventsArray, setEventsArray] = useState<dateType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const [overlayView, setOverlayView] = useState<boolean>(false);

  const setAsyncStorage = async (dateArray: dateType[]) => {
    try {
      await MMKV.setArrayAsync('dateArray', dateArray);
    } catch (error) {
      console.log(error);
    }
  };
  const getStoredDate = async () => {
    const asyncData = await MMKV.getArrayAsync('dateArray');
    const typeData: dateType[] = asyncData as dateType[];
    if (asyncData) {
      setEventsArray([...typeData]);
    }
  };
  useEffect(() => {
    getStoredDate();
  }, []);
  const EventView = (props: {dateInfo: dateType}) => {
    const {dateInfo} = props;

    const eventDate = moment(dateInfo.date);
    const todayDate = moment();
    const eventDatePresentYear = moment(dateInfo.date).set(
      'year',
      todayDate.year(),
    );
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 16,
          marginTop: 16,
        }}>
        <View
          style={{
            height: 70,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.blue,
            borderRadius: 16,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.gray,
              fontSize: 18,
              marginBottom: 5,
            }}>
            {todayDate.diff(eventDatePresentYear, 'days')}
          </Text>
          <Text
            style={{
              fontSize: 9,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: colors.gray,
            }}>
            days
          </Text>
          <Text
            style={{
              fontSize: 9,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: colors.gray,
            }}>
            to go
          </Text>
        </View>
        <View style={{marginLeft: 16, marginBottom: 8}}>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>
            {dateInfo?.eventName}
          </Text>
          <Text>
            {eventDate.format('DD MMMM YYYY')} (
            {todayDate.diff(eventDate, 'years')} Years)
          </Text>
        </View>
      </View>
    );
  };

  const AddDateModel = () => {
    const [showTextInput, setShowTextInput] = useState<boolean>(false);
    const [eventName, setEventName] = useState<string>('');
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#000000aa',
        }}>
        {showTextInput ? (
          <View
            style={{
              backgroundColor: 'white',
              height: metrics.height / 2,
              alignItems: 'center',
              justifyContent: 'center',
              width: metrics.width,
            }}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', top: -6, left: -10}}
              onPress={() => setOverlayView(false)}>
              <Text style={{fontWeight: 'bold'}}>X</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: 'bold',
                color: colors.gray,
                marginBottom: 16,
              }}>
              Event Name
            </Text>
            <Input
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
            />
            <Button
              style={{marginTop: 16}}
              color={colors.gray}
              title="Save"
              onPress={() => {
                const id = _.uniqueId();
                const tempEventArray = [...eventsArray];
                setEventsArray(prev => [
                  ...prev,
                  {date: selectedDate.toISOString(), eventName: eventName, id},
                ]);
                setAsyncStorage([
                  ...tempEventArray,
                  {date: selectedDate.toISOString(), eventName: eventName, id},
                ]);
                setOverlayView(false);
              }}
            />
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'white',
              height: metrics.height / 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', top: -5, left: -10}}
              onPress={() => setOverlayView(false)}>
              <Text style={{fontWeight: 'bold'}}>X</Text>
            </TouchableOpacity>
            <CalendarPicker
              onDateChange={date => setSelectedDate(date)}
              selectedStartDate={selectedDate.toDate()}
            />
            <View style={{marginBottom: 8}}>
              <Text>Selected Date {selectedDate.format('DD-MMM-YYYY')}</Text>
            </View>
            <Button
              color={colors.gray}
              title="Next"
              onPress={() => setShowTextInput(true)}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <CustomHeader
        centerText="Dashboard"
        LeftComponent={() => null}
        RightComponent={() => null}
      />
      <ScrollView>
        <View
          style={{
            height: metrics.height / 5,
            backgroundColor: colors.blue,
            justifyContent: 'center',
            paddingVertical: 16,
          }}>
          <Text
            style={{
              marginLeft: 16,
              color: colors.gray,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Next Event in
          </Text>
          <View style={{flexDirection: 'row', marginLeft: 16}}>
            <Text
              style={{
                marginTop: 16,
                marginLeft: 16,
                color: colors.blue,
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Next Event in
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: colors.gray,
              }}>
              ∞
            </Text>
          </View>
          <Text
            style={{marginLeft: 16, fontWeight: 'bold', color: colors.gray}}>
            Event Details
          </Text>
          <View style={{flexDirection: 'row', marginLeft: 16}}>
            <Text
              style={{marginLeft: 16, fontWeight: 'bold', color: colors.blue}}>
              Event Details
            </Text>
            <Text style={{fontWeight: 'bold', color: colors.gray}}>
              Add events
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              marginTop: 16,
              marginLeft: 16,
              fontWeight: 'bold',
              color: colors.black,
            }}>
            Events
          </Text>
          {eventsArray.length ? (
            eventsArray.map(item => <EventView dateInfo={item} key={item.id} />)
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.black,
                  marginTop: 16,
                }}>
                No Events
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setOverlayView(true)}
        style={{
          position: 'absolute',
          top: metrics.height - (50 + insets.bottom),
          left: metrics.width - 75,
          backgroundColor: colors.gray,
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}>
        <Text style={{fontSize: 40, top: -3, left: 0.5, color: colors.white}}>
          +
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={overlayView}
        onRequestClose={() => {
          setOverlayView(false);
        }}>
        <AddDateModel />
      </Modal>
    </View>
  );
};

export default DashboardScreen;
