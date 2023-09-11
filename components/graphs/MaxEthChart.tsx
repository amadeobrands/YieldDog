
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import type { ReactElement } from 'react'

const RADIAN = Math.PI / 180

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

interface DataItem {
  name: string;
  value: number;
}

interface MaxEthChartProps {
  data: DataItem[];
  colors: string[];
}

const renderCustomizedLabel: React.FC<LabelProps> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text className='text-sm text-center' x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const MaxEthChart: React.FC<MaxEthChartProps> = ({ data, colors }) => {
  return (
    <PieChart width={150} height={150}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip 
        formatter={(value: any) => 
          <p>{value}%</p>
        } 
        itemStyle={{ color: '#333' }}
      />  
    </PieChart>
  )
}

export default MaxEthChart
