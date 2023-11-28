import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const libraries = ['places'];

const center = { lat: 48.8584, lng: 2.2945 };

function Maps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [routeCost, setRouteCost] = useState(0);
  const navigate = useNavigate();

  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    const routeDistance = results.routes[0].legs[0].distance.text;
    const routeDuration = results.routes[0].legs[0].duration.text;

    setDistance(routeDistance);
    setDuration(routeDuration);

    // Calculando o custo da rota com base na distância (considerando um valor fixo por km)
    const distanciaNumerica = parseFloat(routeDistance.replace(' km', ''));
    const valorPorKm = 0.5; // R$0.50 por quilômetro (ajuste conforme necessário)
    const valorTotal = distanciaNumerica * valorPorKm;
    setRouteCost(valorTotal);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setRouteCost(0);
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
    console.log('Sessão encerrada.(Token removido).');
    toast.info('Sessão encerrada.');

  };

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      bgColor='blue.200'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%' zIndex='0'>

        <Box position='absolute' top={4} right={4} zIndex='1'>
          <Button onClick={handleLogout} colorScheme='black' bg='black'>
            Logout
          </Button>
        </Box>

        <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}

          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}

          onLoad={(map) => setMap(map)}

        >

          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} options={{ polylineOptions: { strokeColor: 'red' } }} />}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={4}>
          <Autocomplete>
            <Input type='text' placeholder='Origem' ref={originRef} />
          </Autocomplete>
          <Autocomplete>
            <Input type='text' placeholder='Destino' ref={destinationRef} />
          </Autocomplete>

          <ButtonGroup>
            <Button colorScheme='black' bg='black' type='submit' onClick={calculateRoute}>
              Calcular Rota
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distância: {distance} </Text>
          <Text>Tempo: {duration} </Text>
          <Text>Preço: R${routeCost.toFixed(2)}</Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(center)}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default Maps