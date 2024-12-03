import { useHousingList } from '@/shared/hooks';

export const PehHousing = () => {
  const { housingList } = useHousingList();

  return (
    <>
      <h4>PEH Housing</h4>

      {housingList ? (
        <ul>
          {housingList.map((housing) => (
            <li key={housing.id}>
              <h5>{housing.name}</h5>
              <p>{housing.description}</p>
              <p>{housing.location}</p>
              <p>{housing.isAvailable ? 'Available' : 'Not Available'}</p>
              <p>{housing.contact}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No housing available</p>
      )}
    </>
  );
};
