class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  def extension_white_list
    %w[jpg jpeg gif png svg]
  end

  def extension_black_list
    %w[zip exe bin env]
  end

  def content_type_whitelist
    %r{image/}
  end
end
