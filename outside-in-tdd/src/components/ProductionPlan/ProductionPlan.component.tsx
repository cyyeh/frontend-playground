import { useState, useEffect } from 'react';

import {
  ProductionPlanContainer,
  ProductionPlanForm,
  ProductionPlanTitle,
  DemandPriceSection,
  ProducersSection,
  ProducerSection,
  ProductionPlanResultSection,
} from './ProductionPlan.styled';

const ProductionPlan = () => {
  const [demand, setDemand] = useState(30);
  const [price, setPrice] = useState(20);
  const [producers, setProducers] = useState([
    {
      'id': 'Byzantium',
      'cost': 0,
      'production': 0,
    },
    {
      'id': 'Attalia',
      'cost': 0,
      'production': 0,
    },
    {
      'id': 'Sinope',
      'cost': 0,
      'production': 0,
    },
  ])
  const [shortfall, setShortFall] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const totalProductions = producers.map(producer => producer.production).reduce((total, sum) => total + sum, 0);
    const totalProfit = producers.map(producer => (price - producer.cost) * producer.production).reduce((total, sum) => total + sum, 0);

    setShortFall(demand - totalProductions);
    setProfit(totalProfit);
  }, [demand, price, producers]);

  const handleChangeProducerCost = (
    cost: number,
    originalProducerId: string
  ) => {
    const newProducers = [...producers];
    const oldProducerIndex = producers.findIndex(producer => producer.id === originalProducerId);
    newProducers[oldProducerIndex] = {
      id: newProducers[oldProducerIndex].id,
      cost,
      production: newProducers[oldProducerIndex].production,
    }
    setProducers(newProducers);
  }

  const handleChangeProducerProduction = (
    production: number,
    originalProducerId: string
  ) => {
    const newProducers = [...producers];
    const oldProducerIndex = producers.findIndex(producer => producer.id === originalProducerId);
    newProducers[oldProducerIndex] = {
      id: newProducers[oldProducerIndex].id,
      cost: newProducers[oldProducerIndex].cost,
      production,
    }
    setProducers(newProducers);
  }

  return (
    <ProductionPlanContainer>
      <ProductionPlanForm>
        <ProductionPlanTitle>Province: Asia</ProductionPlanTitle>
        <DemandPriceSection>
          <label htmlFor='demand'>demand</label>
          <input
            type='number'
            aria-label='demand'
            min={0}
            value={demand}
            onChange={e => setDemand(parseInt(e.target.value))}
          />
          <label htmlFor='price'>price</label>
          <input
            type='number'
            aria-label='price'
            min={0}
            value={price}
            onChange={e => setPrice(parseInt(e.target.value))}
          />
        </DemandPriceSection>
        <ProducersSection>
          <p>{`${producers.length} producers`}:</p>
          {producers.map(producer => (
            <ProducerSection key={producer.id} data-testid={`${producer.id}`}>
              <span>{`${producer.id}`}</span>
              <label htmlFor='cost'>cost</label>
              <input
                type='number'
                aria-label='cost'
                min={0}
                value={producer.cost}
                onChange={e => handleChangeProducerCost(parseInt(e.target.value), producer.id)}
              />
              <label htmlFor='production'>production</label>
              <input
                type='number'
                aria-label='production'
                min={0}
                value={producer.production}
                onChange={e => handleChangeProducerProduction(parseInt(e.target.value), producer.id)}
              />
              <label htmlFor='revenue'>full revenue</label>
              <span aria-label='revenue' data-testid='revenue'>{`${producer.cost * producer.production}`}</span>
            </ProducerSection>
          ))}
        </ProducersSection>
      </ProductionPlanForm>
      <ProductionPlanResultSection>
        <label htmlFor='shortfall'>shortfall</label>
        <span aria-label='shortfall' data-testid='shortfall'>{shortfall}</span>
        <label htmlFor='profit'>profit</label>
        <span aria-label='profit' data-testid='profit'>{profit}</span>
      </ProductionPlanResultSection>
    </ProductionPlanContainer>
  )
}

export default ProductionPlan;
