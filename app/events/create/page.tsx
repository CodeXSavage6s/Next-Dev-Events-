'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import SelectableChip from '@/components/SelectableChip';
import { PRESET_TAGS, PRESET_AGENDA } from '@/constants/event-options';

export default function CreateEventPage() {
  const router = useRouter()
  
  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [overview, setOverview] = useState('');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [mode, setMode] = useState('');
  const [audience, setAudience] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // Tags state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Agenda state
  const [selectedAgenda, setSelectedAgenda] = useState<string[]>([]);
  const [customAgenda, setCustomAgenda] = useState<string[]>([]);
  const [newAgenda, setNewAgenda] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(value.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };

  // Tag helpers
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addCustomTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed || customTags.includes(trimmed) || PRESET_TAGS.includes(trimmed)) return;
    setCustomTags((prev) => [...prev, trimmed]);
    setSelectedTags((prev) => [...prev, trimmed]);
    setNewTag('');
  };

  const removeCustomTag = (tag: string) => {
    setCustomTags((prev) => prev.filter((t) => t !== tag));
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  // Agenda helpers
  const toggleAgenda = (item: string) => {
    setSelectedAgenda((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const addCustomAgenda = () => {
    const trimmed = newAgenda.trim();
    if (!trimmed || customAgenda.includes(trimmed) || PRESET_AGENDA.includes(trimmed)) return;
    setCustomAgenda((prev) => [...prev, trimmed]);
    setSelectedAgenda((prev) => [...prev, trimmed]);
    setNewAgenda('');
  };

  const removeCustomAgenda = (item: string) => {
    setCustomAgenda((prev) => prev.filter((a) => a !== item));
    setSelectedAgenda((prev) => prev.filter((a) => a !== item));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!image) {
      setError('Please upload an event image.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('description', description);
      formData.append('overview', overview);
      formData.append('venue', venue);
      formData.append('location', location);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('mode', mode);
      formData.append('audience', audience);
      formData.append('organizer', organizer);
      formData.append('tags', JSON.stringify(selectedTags));
      formData.append('agenda', JSON.stringify(selectedAgenda));

      const res = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create event');
      
      console.log("success", data)
      setSuccess('Event created successfully!');
      setLoading(false)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-700 text-sm text-gray-100
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
    placeholder:text-gray-400 transition
  `;

  const labelClass = 'block text-sm font-semibold text-gray-100 mb-1.5';

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-2xl mx-auto">
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-white">Create Event</h1>
          <p className="text-gray-100 mt-1 text-sm">Fill in the details to publish a new event.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Basic Info */}
          <div className="bg-gray-800 text-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-base font-bold border-b pb-2">Basic Info</h2>

            <div>
              <label className={labelClass}>Title</label>
              <input className={inputClass} placeholder="Event title" value={title}
                onChange={(e) => handleTitleChange(e.target.value)} required />
            </div>

            <div>
              <label className={labelClass}>Slug</label>
              <input className={inputClass} placeholder="auto-generated-slug" value={slug}
                onChange={(e) => setSlug(e.target.value)} required />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea className={inputClass} rows={3} placeholder="Short description..."
                value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div>
              <label className={labelClass}>Overview</label>
              <textarea className={inputClass} rows={4} placeholder="Detailed overview..."
                value={overview} onChange={(e) => setOverview(e.target.value)} required />
            </div>

            <div>
              <label className={labelClass}>Organizer</label>
              <input className={inputClass} placeholder="Who is organizing this?" value={organizer}
                onChange={(e) => setOrganizer(e.target.value)} required />
            </div>

            <div>
              <label className={labelClass}>Audience</label>
              <input className={inputClass} placeholder="e.g. Developers, Designers, CTOs" value={audience}
                onChange={(e) => setAudience(e.target.value)} required />
            </div>
          </div>

          {/* Location & Time */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-base font-bold border-b pb-2">Location & Time</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Date</label>
                <input type="date" className={inputClass} value={date}
                  onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Time</label>
                <input type="time" className={inputClass} value={time}
                  onChange={(e) => setTime(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className={labelClass}>Venue</label>
              <input className={inputClass} placeholder="e.g. Austin Convention Center" value={venue}
                onChange={(e) => setVenue(e.target.value)} required />
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input className={inputClass} placeholder="e.g. Austin, TX" value={location}
                onChange={(e) => setLocation(e.target.value)} required />
            </div>

            <div>
              <label className={labelClass}>Mode</label>
              <select className={inputClass} value={mode} onChange={(e) => setMode(e.target.value)} required>
                <option value="">Select mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Image */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
            <h2 className="text-base font-bold border-b pb-2">Event Image</h2>
            <label htmlFor="img" >Upload Image</label>
            <input id="img" type="file" accept="image/*" className="text-sm text-gray-600"
              onChange={(e) => setImage(e.target.files?.[0] || null)} required />
            {image && (
              <p className="text-xs text-indigo-500 font-medium">Selected: {image.name}</p>
            )}
          </div>

          {/* Tags */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-base font-bold border-b pb-2">
              Tags
              {selectedTags.length > 0 && (
                <span className="ml-2 text-xs font-normal text-indigo-500">
                  {selectedTags.length} selected
                </span>
              )}
            </h2>

            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => (
                <SelectableChip key={tag} label={tag}
                  selected={selectedTags.includes(tag)} onToggle={() => toggleTag(tag)} />
              ))}
              {customTags.map((tag) => (
                <SelectableChip key={tag} label={tag} isCustom
                  selected={selectedTags.includes(tag)}
                  onToggle={() => toggleTag(tag)}
                  onRemove={() => removeCustomTag(tag)} />
              ))}
            </div>

            <div className="flex gap-2">
              <input className={`${inputClass} flex-1`} placeholder="Add custom tag..."
                value={newTag} onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())} />
              <button type="button" onClick={addCustomTag}
                className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                <Plus size={15} /> Add
              </button>
            </div>
          </div>

          {/* Agenda */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
            <h2 className="text-base font-bold border-b pb-2">
              Agenda
              {selectedAgenda.length > 0 && (
                <span className="ml-2 text-xs font-normal text-indigo-500">
                  {selectedAgenda.length} selected
                </span>
              )}
            </h2>

            <div className="flex flex-wrap gap-2">
              {PRESET_AGENDA.map((item) => (
                <SelectableChip key={item} label={item}
                  selected={selectedAgenda.includes(item)} onToggle={() => toggleAgenda(item)} />
              ))}
              {customAgenda.map((item) => (
                <SelectableChip key={item} label={item} isCustom
                  selected={selectedAgenda.includes(item)}
                  onToggle={() => toggleAgenda(item)}
                  onRemove={() => removeCustomAgenda(item)} />
              ))}
            </div>

            <div className="flex gap-2">
              <input className={`${inputClass} flex-1`} placeholder="Add custom agenda item..."
                value={newAgenda} onChange={(e) => setNewAgenda(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAgenda())} />
              <button type="button" onClick={addCustomAgenda}
                className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                <Plus size={15} /> Add
              </button>
            </div>
          </div>

          {/* Feedback */}
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          {success && <p className="text-sm text-green-500 font-medium">{success}</p>}

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>

        </form>
      </div>
    </div>
  );
}