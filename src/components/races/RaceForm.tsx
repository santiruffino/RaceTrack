import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Clock, Mountain, Award, CalendarDays, MapPinned } from 'lucide-react';
import { Race, TerrainType } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Card from '../ui/Card';
import RaceNameAutocomplete from './RaceNameAutocomplete';
import { upsertRaceName } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const isEditing = !!initialData?.id;
  const isCompleted = initialData?.isCompleted ?? false;
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<Partial<Race>>({
    defaultValues: {
      name: initialData?.name || '',
      date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
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
  const timeToSeconds = (timeString: string | number): number => {
    if (typeof timeString === 'number') {
      return timeString;
    }
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
          {isEditing ? t('races.editRace') : t('races.addNewRace')}
        </h2>
        
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Race Name Autocomplete */}
            <div className="md:col-span-2">
              <Controller
                name="name"
                control={control}
                rules={{ required: t('races.errors.nameRequired') }}
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
                label={t('races.date')}
                type="date"
                error={errors.date?.message}
                icon={<CalendarDays size={18} className="text-gray-400" />}
                {...register('date', { required: t('races.errors.dateRequired') })}
              />
            </div>
            
            {/* Distance */}
            <div>
              <Input
                label={t('races.distance')}
                type="number"
                step="0.01"
                min="0"
                placeholder={t('races.distancePlaceholder')}
                error={errors.distance?.message}
                {...register('distance', { 
                  required: t('races.errors.distanceRequired'),
                  valueAsNumber: true,
                  min: { value: 0, message: t('races.errors.distancePositive') }
                })}
              />
            </div>
            
            {/* Terrain Type */}
            <div>
              <Controller
                control={control}
                name="terrainType"
                rules={{ required: t('races.errors.terrainTypeRequired') }}
                render={({ field }) => (
                  <Select
                    label={t('races.terrainType')}
                    options={[
                      { value: 'road', label: t('races.terrainTypes.road') },
                      { value: 'trail', label: t('races.terrainTypes.trail') },
                      { value: 'cross', label: t('races.terrainTypes.cross') }
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
                label={t('races.location')}
                placeholder={t('races.locationPlaceholder')}
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
                  {t('races.completed')}
                </label>
              </div>
            </div>
            
            {/* Fields shown only for completed races */}
            {watchIsCompleted && (
              <>
                {/* Time */}
                <div>
                  <Input
                    label={t('races.time')}
                    placeholder="00:00:00"
                    error={errors.time?.message}
                    icon={<Clock size={18} className="text-gray-400" />}
                    defaultValue={initialData?.time}
                    {...register('time', { 
                      required: false,
                      setValueAs: (value) => value ? timeToSeconds(value) : undefined
                    })}
                  />
                </div>
                
                {/* Elevation Gain for Trail */}
                {watchTerrainType === 'trail' && (
                  <div>
                    <Input
                      label={t('races.elevationGain')}
                      type="number"
                      placeholder={t('races.elevationGainPlaceholder')}
                      error={errors.elevationGain?.message}
                      icon={<Mountain size={18} className="text-gray-400" />}
                      {...register('elevationGain', { 
                        valueAsNumber: true,
                        min: { value: 0, message: t('races.errors.elevationPositive') }
                      })}
                    />
                  </div>
                )}
                
                {/* Position */}
                <div>
                  <Input
                    label={t('races.overallPosition')}
                    type="number"
                    placeholder={t('races.overallPositionPlaceholder')}
                    error={errors.position?.message?.toString()}
                    icon={<Award size={18} className="text-gray-400" />}
                    {...register('position.general', { 
                      valueAsNumber: true,
                      min: { value: 0, message: t('races.errors.positionPositive') }
                    })}
                  />
                </div>
                
                <div>
                  <Input
                    label={t('races.ageGroupPosition')}
                    type="number"
                    placeholder={t('races.ageGroupPositionPlaceholder')}
                    error={errors.position?.message?.toString()}
                    {...register('position.ageGroup', { 
                      valueAsNumber: true,
                      min: { value: 0, message: t('races.errors.positionPositive') }
                    })}
                  />
                </div>
                
                <div>
                  <Input
                    label={t('races.genderPosition')}
                    type="number"
                    placeholder={t('races.genderPositionPlaceholder')}
                    error={errors.position?.message?.toString()}
                    {...register('position.gender', { 
                      valueAsNumber: true,
                      min: { value: 0, message: t('races.errors.positionPositive') }
                    })}
                  />
                </div>
              </>
            )}
            
            {/* Notes */}
            <div className="md:col-span-2">
              <Input
                label={t('races.notes')}
                placeholder={t('races.notesPlaceholder')}
                error={errors.notes?.message}
                {...register('notes')}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isLoading}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
            >
              {isEditing ? t('common.save') : t('common.add')}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default RaceForm;