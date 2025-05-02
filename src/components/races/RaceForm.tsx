import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Clock, MapPin, Mountain, Award, CalendarDays, MapPinned } from 'lucide-react';
import { Race, TerrainType, Position } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Card from '../ui/Card';
import RaceNameAutocomplete from './RaceNameAutocomplete';
import { upsertRaceName } from '../../lib/supabase';

interface RaceFormProps {
  initialData?: Partial<Race>;
  onSubmit: (data: Partial<Race>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const RaceForm: React.FC<RaceFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const isEditing = !!initialData?.id;
  const isCompleted = initialData?.isCompleted ?? false;
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<Partial<Race>>({
    defaultValues: {
      name: initialData?.name || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
      distance: initialData?.distance || undefined,
      terrainType: initialData?.terrainType || 'road',
      time: initialData?.time || undefined,
      elevationGain: initialData?.elevationGain || undefined,
      position: initialData?.position || { general: 0, ageGroup: 0, gender: 0 },
      isCompleted: isCompleted,
      notes: initialData?.notes || '',
      location: initialData?.location || '',
    }
  });
  
  const watchTerrainType = watch('terrainType') as TerrainType;
  const watchIsCompleted = watch('isCompleted');
  
  // Helper to convert time string to seconds
  const timeToSeconds = (timeString: string): number => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };
  
  // Helper to convert seconds to time string
  const secondsToTime = (seconds?: number): string => {
    if (!seconds) return '00:00:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs].map(val => val.toString().padStart(2, '0')).join(':');
  };
  
  const handleFormSubmit = async (data: Partial<Race>) => {
    // Save race name to race_names table
    if (data.name) {
      await upsertRaceName(data.name);
    }
    
    // Convert time string to seconds if provided
    if (typeof data.time === 'string') {
      data.time = timeToSeconds(data.time);
    }
    
    onSubmit(data);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Edit Race' : 'Add New Race'}
        </h2>
        
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Race Name Autocomplete */}
            <div className="md:col-span-2">
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Race name is required' }}
                render={({ field }) => (
                  <RaceNameAutocomplete
                    value={field.value}
                    onChange={field.onChange}
                    onSelect={(name) => setValue('name', name)}
                    error={errors.name?.message}
                  />
                )}
              />
            </div>
            
            {/* Date */}
            <div>
              <Input
                label="Race Date"
                type="date"
                error={errors.date?.message}
                icon={<CalendarDays size={18} className="text-gray-400" />}
                {...register('date', { required: 'Date is required' })}
              />
            </div>
            
            {/* Distance */}
            <div>
              <Input
                label="Distance (km)"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter distance in kilometers"
                error={errors.distance?.message}
                {...register('distance', { 
                  required: 'Distance is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Distance must be positive' }
                })}
              />
            </div>
            
            {/* Terrain Type */}
            <div>
              <Controller
                control={control}
                name="terrainType"
                rules={{ required: 'Terrain type is required' }}
                render={({ field }) => (
                  <Select
                    label="Terrain Type"
                    options={[
                      { value: 'road', label: 'Road' },
                      { value: 'trail', label: 'Trail' },
                      { value: 'cross', label: 'Cross' }
                    ]}
                    error={errors.terrainType?.message}
                    {...field}
                  />
                )}
              />
            </div>
            
            {/* Location */}
            <div>
              <Input
                label="Location"
                placeholder="Enter race location"
                error={errors.location?.message}
                icon={<MapPinned size={18} className="text-gray-400" />}
                {...register('location')}
              />
            </div>
            
            {/* Is Completed */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <input
                  id="isCompleted"
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  {...register('isCompleted')}
                />
                <label htmlFor="isCompleted" className="ml-2 text-sm font-medium text-gray-700">
                  Race completed
                </label>
              </div>
            </div>
            
            {/* Fields shown only for completed races */}
            {watchIsCompleted && (
              <>
                {/* Time */}
                <div>
                  <Input
                    label="Time (hh:mm:ss)"
                    placeholder="00:00:00"
                    error={errors.time?.message}
                    icon={<Clock size={18} className="text-gray-400" />}
                    defaultValue={initialData?.time ? secondsToTime(initialData.time) : ''}
                    {...register('time')}
                  />
                </div>
                
                {/* Elevation Gain for Trail */}
                {watchTerrainType === 'trail' && (
                  <div>
                    <Input
                      label="Elevation Gain (m)"
                      type="number"
                      placeholder="Enter elevation in meters"
                      error={errors.elevationGain?.message}
                      icon={<Mountain size={18} className="text-gray-400" />}
                      {...register('elevationGain', { 
                        valueAsNumber: true,
                        min: { value: 0, message: 'Elevation must be positive' }
                      })}
                    />
                  </div>
                )}
                
                {/* Position */}
                <div>
                  <Input
                    label="Overall Position"
                    type="number"
                    placeholder="Your overall position"
                    error={errors.position?.message?.toString()}
                    icon={<Award size={18} className="text-gray-400" />}
                    {...register('position.general', { 
                      valueAsNumber: true,
                      min: { value: 0, message: 'Position must be positive' }
                    })}
                  />
                </div>
                
                <div>
                  <Input
                    label="Age Group Position"
                    type="number"
                    placeholder="Your age group position"
                    error={errors.position?.message?.toString()}
                    {...register('position.ageGroup', { 
                      valueAsNumber: true,
                      min: { value: 0, message: 'Position must be positive' }
                    })}
                  />
                </div>
                
                <div>
                  <Input
                    label="Gender Position"
                    type="number"
                    placeholder="Your gender position"
                    error={errors.position?.message?.toString()}
                    {...register('position.gender', { 
                      valueAsNumber: true,
                      min: { value: 0, message: 'Position must be positive' }
                    })}
                  />
                </div>
              </>
            )}
            
            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                rows={3}
                placeholder="Add any notes about this race"
                {...register('notes')}
              ></textarea>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
            >
              {isEditing ? 'Update Race' : 'Add Race'}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default RaceForm;