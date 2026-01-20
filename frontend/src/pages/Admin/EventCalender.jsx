// EventCalendar.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { api } from '../../services/api';
import {
  EventCalendarContainer,
  Content,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  CurrentTime,
  MainContent,
  FormSection,
  FormCard,
  FormTitle,
  FormTitleIcon,
  AddEventForm,
  FormGroup,
  EventInput,
  AddEventButton,
  AddEventButtonIcon,
  ErrorText,
  SuccessText,
  EventsSection,
  SectionTitle,
  SectionTitleIcon,
  EventsGrid,
  Event,
  EventContent,
  EventNumber,
  EventText,
  EventActions,
  DeleteButton,
  EmptyState,
  EmptyIcon,
  EmptyText,
} from '../../styles/EventCalendarStyles';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await api.get('/api/v1/events/getall');
      setEvents(response.data.event || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to add a new event
  const addEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.trim()) {
      setError('Please enter an event');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await api.post('/api/v1/events', {
        events: newEvent,
      });
      if (response.data.event) {
        setEvents([...events, response.data.event]);
      }
      setNewEvent('');
      setSuccess('Event added successfully!');
      setTimeout(() => setSuccess(null), 3000);
      // Refresh events list
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Error adding event');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an event
  const deleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await api.delete(`/api/v1/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
      setSuccess('Event deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Error deleting event:', error);
      setError(error.response?.data?.message || 'Error deleting event');
      setTimeout(() => setError(null), 3000);
      // Refresh events list to ensure consistency
      fetchEvents();
    }
  };

  return (
    <EventCalendarContainer>
      <Sidebar />
      <Content>
        <Header>
          <div>
            <HeaderTitle>📅 Events & Calendar</HeaderTitle>
            <HeaderSubtitle>Manage all school events and activities</HeaderSubtitle>
          </div>
          <CurrentTime>{new Date().toLocaleString()}</CurrentTime>
        </Header>

        <MainContent>
          <FormSection>
            <FormCard>
              <FormTitle>
                <FormTitleIcon>➕</FormTitleIcon>
                Add New Event
              </FormTitle>
              <AddEventForm onSubmit={addEvent}>
                <FormGroup>
                  <EventInput
                    type="text"
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    placeholder="Enter event name, date, time, or description..."
                    disabled={loading}
                  />
                  <AddEventButton type="submit" disabled={loading}>
                    <AddEventButtonIcon>+</AddEventButtonIcon>
                    {loading ? 'Adding...' : 'Add Event'}
                  </AddEventButton>
                </FormGroup>
              </AddEventForm>
              {error && <ErrorText>{error}</ErrorText>}
              {success && <SuccessText>{success}</SuccessText>}
            </FormCard>
          </FormSection>

          <EventsSection>
            <SectionTitle>
              <SectionTitleIcon>📌</SectionTitleIcon>
              All Events ({events.length})
            </SectionTitle>
            {events && events.length > 0 ? (
              <EventsGrid>
                {events.map((event, index) => (
                  <Event key={event._id || index}>
                    <EventContent>
                      <EventNumber>{index + 1}</EventNumber>
                      <EventText>{event.events || event}</EventText>
                    </EventContent>
                    <EventActions>
                      <DeleteButton onClick={() => deleteEvent(event._id || event)}>
                        🗑️
                      </DeleteButton>
                    </EventActions>
                  </Event>
                ))}
              </EventsGrid>
            ) : (
              <EmptyState>
                <EmptyIcon>📭</EmptyIcon>
                <EmptyText>No events yet. Create your first event!</EmptyText>
              </EmptyState>
            )}
          </EventsSection>
        </MainContent>
      </Content>
    </EventCalendarContainer>
  );
};

export default EventCalendar;
